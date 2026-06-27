<?php
require_once 'db/database.php';
require_once 'vendor/autoload.php'; // برای JWT

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? $_GET['path'] : '';

// تابع تولید JWT
function generateToken($user) {
    $secret_key = "your_jwt_secret_key";
    $payload = [
        'id' => $user['id'],
        'phone' => $user['phone'],
        'name' => $user['name'],
        'password' => $user['password'],
        'image' => $user['image'],
        'iat' => time(),
        'exp' => time() + (24 * 60 * 60) // 1 day
    ];
    return JWT::encode($payload, $secret_key, 'HS256');
}

// پوشه آپلود
$uploadDir = './uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// هندل کردن آپلود فایل
if ($method === 'POST' && $path === 'main') {
    if (isset($_FILES['file'])) {
        $allowed = ['image/jpeg', 'image/png', 'application/pdf'];
        $fileType = $_FILES['file']['type'];
        
        if (!in_array($fileType, $allowed)) {
            echo json_encode(['error' => 'فرمت فایل مجاز نیست']);
            exit;
        }
        
        if ($_FILES['file']['size'] > 5 * 1024 * 1024) {
            echo json_encode(['error' => 'حجم فایل بیشتر از 5 مگابایت است']);
            exit;
        }
        
        $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $filename = time() . '-' . rand(1, 999999999) . '.' . $ext;
        $destination = $uploadDir . $filename;
        
        if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
            echo json_encode(['message' => 'فایل با موفقیت آپلود شد!', 'file' => ['filename' => $filename]]);
        } else {
            echo json_encode(['error' => 'خطا در آپلود فایل']);
        }
    } else {
        echo json_encode(['error' => 'فایلی ارسال نشده است']);
    }
    exit;
}

// دریافت همه محصولات
if ($method === 'GET' && $path === 'api/products') {
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
    exit;
}

// ویرایش محصول
if ($method === 'PUT' && preg_match('/\/api\/products\/edit\/(\d+)/', $path, $matches)) {
    $id = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);
    
    $sql = "UPDATE products SET name = ?, price = ?, count = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("siii", $data['name'], $data['price'], $data['count'], $id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'result' => ['affected_rows' => $stmt->affected_rows]]);
    } else {
        echo json_encode(['error' => 'خطا در ویرایش']);
    }
    exit;
}

// حذف محصول
if ($method === 'DELETE' && preg_match('/\/api\/products\/delete\/(\d+)/', $path, $matches)) {
    $id = $matches[1];
    
    $sql = "DELETE FROM products WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'result' => ['affected_rows' => $stmt->affected_rows]]);
    } else {
        echo json_encode(['error' => 'خطا در حذف']);
    }
    exit;
}

// ایجاد محصول جدید
if ($method === 'POST' && $path === 'api/products/create') {
    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? 0;
    $count = $_POST['count'] ?? 0;
    $image = null;
    
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $image = time() . '-' . rand(1, 999999999) . '.' . $ext;
        move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $image);
    }
    
    $sql = "INSERT INTO products (name, count, price, image) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("siis", $name, $count, $price, $image);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'result' => ['insert_id' => $stmt->insert_id]]);
    } else {
        echo json_encode(['error' => 'خطا در ایجاد محصول']);
    }
    exit;
    
}


// ثبت نام کاربر
if ($method === 'POST' && $path === 'api/users') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $phone = $data['phone'];
    $password = $data['password'];
    
    // بررسی مسدودیت
    $checkBan = "SELECT * FROM users WHERE phone = ? AND isBanned = TRUE";
    $stmt = $conn->prepare($checkBan);
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $banResult = $stmt->get_result();
    
    if ($banResult->num_rows > 0) {
        echo json_encode(['error' => 'اکانت شما مسدود شده است']);
        exit;
    }
    
    // بررسی تکراری بودن شماره
    $checkTwo = "SELECT * FROM users WHERE phone = ?";
    $stmt = $conn->prepare($checkTwo);
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $twoResult = $stmt->get_result();
    
    if ($twoResult->num_rows > 0) {
        echo json_encode(['error' => 'این شماره تلفن قبلا ثبت نام کرده است']);
        exit;
    }
    
    $image = "gray-user-profile-icon-png-fP8Q1P.png";
    $sql = "INSERT INTO users (name, phone, password, image) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $phone, $password, $image);
    
    if ($stmt->execute()) {
        $user = ['id' => $stmt->insert_id, 'phone' => $phone, 'name' => $name, 'password' => $password, 'image' => $image];
        $token = generateToken($user);
        echo json_encode(['token' => $token]);
    } else {
        echo json_encode(['error' => 'خطا در ثبت‌نام']);
    }
    exit;
}

// ورود کاربر
if ($method === 'POST' && $path === 'api/users/login') {
    $data = json_decode(file_get_contents('php://input'), true);
    $phone = $data['phone'];
    $password = $data['password'];
    
    // بررسی مسدودیت
    $checkBan = "SELECT * FROM users WHERE phone = ? AND isBanned = TRUE";
    $stmt = $conn->prepare($checkBan);
    $stmt->bind_param("s", $phone);
    $stmt->execute();
    $banResult = $stmt->get_result();
    
    if ($banResult->num_rows > 0) {
        echo json_encode(['error' => 'اکانت شما مسدود شده است']);
        exit;
    }
    
    // بررسی ورود
    $sql = "SELECT * FROM users WHERE phone = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $phone, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['error' => 'کاربر یافت نشد یا رمز اشتباه است']);
        exit;
    }
    
    $user = $result->fetch_assoc();
    $token = generateToken($user);
    echo json_encode(['token' => $token]);
    exit;
}

// ویرایش رمز عبور
if ($method === 'PUT' && $path === 'api/users/edit/password') {
    $data = json_decode(file_get_contents('php://input'), true);
    $password = $data['password'];
    $id = $data['id'];
    
    $sql = "UPDATE users SET password = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $password, $id);
    
    if ($stmt->execute()) {
        $getUserSql = "SELECT * FROM users WHERE id = ?";
        $stmt2 = $conn->prepare($getUserSql);
        $stmt2->bind_param("i", $id);
        $stmt2->execute();
        $userResult = $stmt2->get_result();
        
        if ($userResult->num_rows > 0) {
            $user = $userResult->fetch_assoc();
            $newToken = generateToken($user);
            echo json_encode(['success' => true, 'token' => $newToken]);
        } else {
            echo json_encode(['error' => 'خطا در دریافت اطلاعات کاربر']);
        }
    } else {
        echo json_encode(['error' => 'خطا در تغییر رمز']);
    }
    exit;
}

// ویرایش پروفایل
if ($method === 'POST' && $path === 'api/users/edit/profile') {
    $id = $_POST['id'] ?? '';
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    
    $image = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $image = time() . '-' . rand(1, 999999999) . '.' . $ext;
        move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $image);
    }
    
    if ($image) {
        $sql = "UPDATE users SET name = ?, phone = ?, image = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $name, $phone, $image, $id);
    } else {
        $sql = "UPDATE users SET name = ?, phone = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $name, $phone, $id);
    }
    
    if ($stmt->execute()) {
        $getUserSql = "SELECT * FROM users WHERE id = ?";
        $stmt2 = $conn->prepare($getUserSql);
        $stmt2->bind_param("i", $id);
        $stmt2->execute();
        $userResult = $stmt2->get_result();
        
        if ($userResult->num_rows > 0) {
            $user = $userResult->fetch_assoc();
            $newToken = generateToken($user);
            echo json_encode(['success' => true, 'token' => $newToken]);
        } else {
            echo json_encode(['error' => 'خطا در دریافت اطلاعات']);
        }
    } else {
        echo json_encode(['error' => 'خطا در ذخیره اطلاعات']);
    }
    exit;
}

// تعداد کاربران
if ($method === 'GET' && $path === 'api/user/count') {
    $sql = "SELECT COUNT(*) as count FROM users";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode([$row]);
    exit;
}

// تعداد محصولات
if ($method === 'GET' && $path === 'api/products/count') {
    $sql = "SELECT COUNT(*) as count FROM products";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo json_encode([$row]);
    exit;
}

// لیست کاربران
if ($method === 'GET' && $path === 'api/users/list') {
    $sql = "SELECT * FROM users";
    $result = $conn->query($sql);
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
    exit;
}

// حذف کاربر
if ($method === 'DELETE' && preg_match('/\/api\/users\/delete\/(\d+)/', $path, $matches)) {
    $id = $matches[1];
    
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'result' => ['affected_rows' => $stmt->affected_rows]]);
    } else {
        echo json_encode(['error' => 'خطا در حذف']);
    }
    exit;
}



// ویرایش کاربر
if ($method === 'PUT' && preg_match('/\/api\/users\/edit\/(\d+)/', $path, $matches)) {
    $id = $matches[1];
    $data = json_decode(file_get_contents('php://input'), true);
    
    $sql = "UPDATE users SET name = ?, phone = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $data['name'], $data['phone'], $id);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'result' => ['affected_rows' => $stmt->affected_rows]]);
    } else {
        echo json_encode(['error' => 'خطا در ویرایش']);
    }
    exit;
}

// ایجاد کاربر جدید
if ($method === 'POST' && $path === 'api/users/create') {
    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? '';
    $image = null;
    
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $image = time() . '-' . rand(1, 999999999) . '.' . $ext;
        move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $image);
    }
    
    $sql = "INSERT INTO users (name, phone, image) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $price, $image);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'result' => ['insert_id' => $stmt->insert_id]]);
    } else {
        echo json_encode(['error' => 'خطا در ایجاد کاربر']);
    }
    exit;
}

// برای مسیرهای ناشناخته
echo json_encode(['error' => 'مسیر یافت نشد']);
?>