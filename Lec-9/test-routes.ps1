# Test all API routes

$baseUrl = "http://localhost:8000/api/user"

# Test 1: Create User 1
Write-Host "=== TEST 1: CREATE USER 1 ===" -ForegroundColor Green
$user1 = @{
    first_name = "Rajesh"
    last_name = "Kumar"
    email = "rajesh@example.com"
    job_title = "Software Engineer"
    gender = "Male"
    ip_address = "192.168.1.1"
} | ConvertTo-Json

$response1 = Invoke-WebRequest -Uri $baseUrl -Method POST -ContentType "application/json" -Body $user1 -UseBasicParsing
$user1_response = $response1.Content | ConvertFrom-Json
Write-Host ($user1_response | ConvertTo-Json)
$userId1 = $user1_response.user._id
Write-Host "User 1 ID: $userId1" -ForegroundColor Cyan

# Test 2: Create User 2
Write-Host "`n=== TEST 2: CREATE USER 2 ===" -ForegroundColor Green
$user2 = @{
    first_name = "Priya"
    last_name = "Singh"
    email = "priya@example.com"
    job_title = "Product Manager"
    gender = "Female"
    ip_address = "192.168.1.2"
} | ConvertTo-Json

$response2 = Invoke-WebRequest -Uri $baseUrl -Method POST -ContentType "application/json" -Body $user2 -UseBasicParsing
$user2_response = $response2.Content | ConvertFrom-Json
Write-Host ($user2_response | ConvertTo-Json)
$userId2 = $user2_response.user._id
Write-Host "User 2 ID: $userId2" -ForegroundColor Cyan

# Test 3: Create User 3
Write-Host "`n=== TEST 3: CREATE USER 3 ===" -ForegroundColor Green
$user3 = @{
    first_name = "Arun"
    last_name = "Verma"
    email = "arun@example.com"
    job_title = "DevOps Engineer"
    gender = "Male"
    ip_address = "192.168.1.3"
} | ConvertTo-Json

$response3 = Invoke-WebRequest -Uri $baseUrl -Method POST -ContentType "application/json" -Body $user3 -UseBasicParsing
$user3_response = $response3.Content | ConvertFrom-Json
Write-Host ($user3_response | ConvertTo-Json)
$userId3 = $user3_response.user._id
Write-Host "User 3 ID: $userId3" -ForegroundColor Cyan

# Test 4: GET ALL USERS
Write-Host "`n=== TEST 4: GET ALL USERS ===" -ForegroundColor Green
$getAll = Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing
$allUsers = $getAll.Content | ConvertFrom-Json
Write-Host "Total users: $($allUsers.Count)"
Write-Host ($allUsers | ConvertTo-Json)

# Test 5: GET USER BY ID
Write-Host "`n=== TEST 5: GET USER BY ID ===" -ForegroundColor Green
$getOne = Invoke-WebRequest -Uri "$baseUrl/$userId1" -Method GET -UseBasicParsing
$oneUser = $getOne.Content | ConvertFrom-Json
Write-Host ($oneUser | ConvertTo-Json)

# Test 6: UPDATE USER
Write-Host "`n=== TEST 6: UPDATE USER ===" -ForegroundColor Green
$updateData = @{
    first_name = "Rajesh"
    last_name = "Kumar Singh"
    job_title = "Senior Software Engineer"
} | ConvertTo-Json

$updateResponse = Invoke-WebRequest -Uri "$baseUrl/$userId1" -Method PATCH -ContentType "application/json" -Body $updateData -UseBasicParsing
$updateResult = $updateResponse.Content | ConvertFrom-Json
Write-Host ($updateResult | ConvertTo-Json)

# Test 7: DELETE USER
Write-Host "`n=== TEST 7: DELETE USER ===" -ForegroundColor Green
$deleteResponse = Invoke-WebRequest -Uri "$baseUrl/$userId3" -Method DELETE -UseBasicParsing
$deleteResult = $deleteResponse.Content | ConvertFrom-Json
Write-Host ($deleteResult | ConvertTo-Json)

# Test 8: GET ALL USERS AFTER DELETE
Write-Host "`n=== TEST 8: GET ALL USERS AFTER DELETE ===" -ForegroundColor Green
$getAllAfter = Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing
$allUsersAfter = $getAllAfter.Content | ConvertFrom-Json
Write-Host "Total users after delete: $($allUsersAfter.Count)"
Write-Host ($allUsersAfter | ConvertTo-Json)

Write-Host "`n=== ALL TESTS COMPLETED ===" -ForegroundColor Cyan
