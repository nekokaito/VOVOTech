<?php
include 'connect.php';

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if (!$pdo) {
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    
    $firstName = trim($data['firstName']);
    $lastName = trim($data['lastName']);
    $contactNumber = trim($data['contactNumber']);
    $email = trim($data['email']);
    $city = trim($data['city']);
    $state = trim($data['state']);
    $paymentMethod = trim($data['paymentMethod']);
    $grandTotal = floatval($data['grandTotal']); 
    $products = $data['products'];

    try {
        // Insert customer data
        $customerQuery = "INSERT INTO customers (first_name, last_name, contact_number, email, city, state, payment_method)
                          VALUES (:firstName, :lastName, :contactNumber, :email, :city, :state, :paymentMethod)";
        $stmt = $pdo->prepare($customerQuery);
        $stmt->execute([
            ':firstName' => $firstName,
            ':lastName' => $lastName,
            ':contactNumber' => $contactNumber,
            ':email' => $email,
            ':city' => $city,
            ':state' => $state,
            ':paymentMethod' => $paymentMethod,
        ]);

        // Get the last inserted ID
        $orderID = $pdo->lastInsertId();

        // Insert order summary
        $orderQuery = "INSERT INTO orders_summary (grand_total) VALUES (:grandTotal)";
        $stmt = $pdo->prepare($orderQuery);
        $stmt->execute([':grandTotal' => $grandTotal]);

        // Get the last inserted order ID
        $orderID = $pdo->lastInsertId();

        // Insert order details
        foreach ($products as $product) {
            $productName = trim($product['productName']);
            $model = trim($product['model']);
            $quantity = intval($product['quantity']); // Ensure quantity is an integer
            $totalPrice = floatval($product['totalPrice']); // Ensure price is a float

            $productQuery = "INSERT INTO order_details (order_id, product_name, model, quantity, total_price) 
                             VALUES (:orderID, :productName, :model, :quantity, :totalPrice)";
            $stmt = $pdo->prepare($productQuery);
            $stmt->execute([
                ':orderID' => $orderID,
                ':productName' => $productName,
                ':model' => $model,
                ':quantity' => $quantity,
                ':totalPrice' => $totalPrice
            ]);
        }

        echo json_encode([
            "status" => "success",
            "message" => "Order details received and inserted successfully"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Database error: " . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No data received"
    ]);
}

// Close the connection (optional for PDO)
$pdo = null;
?>
