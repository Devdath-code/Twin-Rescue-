<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// File to store data (JSON)
$dataFile = 'health_data.json';

// Handle POST request (receive data from MIT App Inventor)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if ($data) {
        // Add timestamp
        $data['timestamp'] = date('c');
        
        // Validate data
        $healthData = [
            'heartRate' => isset($data['heartRate']) ? (int)$data['heartRate'] : 0,
            'spo2' => isset($data['spo2']) ? (int)$data['spo2'] : 0,
            'fallDetected' => isset($data['fallDetected']) ? (bool)$data['fallDetected'] : false,
            'latitude' => isset($data['latitude']) ? (float)$data['latitude'] : 0,
            'longitude' => isset($data['longitude']) ? (float)$data['longitude'] : 0,
            'timestamp' => $data['timestamp']
        ];
        
        // Save to file
        file_put_contents($dataFile, json_encode($healthData));
        
        // Return success
        echo json_encode([
            'success' => true,
            'message' => 'Data received successfully'
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid JSON data'
        ]);
    }
}

// Handle GET request (send data to dashboard)
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if data file exists
    if (file_exists($dataFile)) {
        $data = file_get_contents($dataFile);
        echo $data;
    } else {
        // Return default/empty data
        echo json_encode([
            'heartRate' => 0,
            'spo2' => 0,
            'fallDetected' => false,
            'latitude' => 0,
            'longitude' => 0,
            'timestamp' => date('c')
        ]);
    }
}

// Handle other methods
else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>