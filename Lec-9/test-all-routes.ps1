# Test all API routes with existing data

$baseUrl = "http://localhost:8000/api/user"

Write-Host "=== TESTING ALL ROUTES ===" -ForegroundColor Cyan

# Test 1: GET ALL USERS
Write-Host "`n=== TEST 1: GET ALL USERS ===" -ForegroundColor Green
try {
    $getAll = Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing
    $allUsers = $getAll.Content | ConvertFrom-Json
    Write-Host "✓ Success! Total users: $($allUsers.Count)" -ForegroundColor Green
    Write-Host ($allUsers | ConvertTo-Json)
    
    # Store first user ID for later tests
    if ($allUsers.Count -gt 0) {
        $userId1 = $allUsers[0]._id
        $userId2 = $allUsers[1]._id
        Write-Host "`n✓ User IDs stored for next tests" -ForegroundColor Green
    }
} 
catch {
    Write-Host "✗ Failed: $_" -ForegroundColor Red
}

# Test 2: GET USER BY ID
if ($userId1) {
    Write-Host "`n=== TEST 2: GET USER BY ID ($userId1) ===" -ForegroundColor Green
    try {
        $getOne = Invoke-WebRequest -Uri "$baseUrl/$userId1" -Method GET -UseBasicParsing
        $oneUser = $getOne.Content | ConvertFrom-Json
        Write-Host "✓ Success!" -ForegroundColor Green
        Write-Host ($oneUser | ConvertTo-Json)
    } catch {
        Write-Host "✗ Failed: $_" -ForegroundColor Red
    }
}

# Test 3: CREATE NEW USER
Write-Host "`n=== TEST 3: CREATE NEW USER ===" -ForegroundColor Green
$newUser = @{
    first_name = "Neha"
    last_name = "Gupta"
    email = "neha@example.com"
    job_title = "QA Engineer"
    gender = "Female"
    ip_address = "192.168.1.4"
} | ConvertTo-Json

try {
    $createResponse = Invoke-WebRequest -Uri $baseUrl -Method POST -ContentType "application/json" -Body $newUser -UseBasicParsing
    $createResult = $createResponse.Content | ConvertFrom-Json
    Write-Host "✓ Success!" -ForegroundColor Green
    Write-Host ($createResult | ConvertTo-Json)
    $userId4 = $createResult.user._id
} catch {
    Write-Host "✗ Failed: $_" -ForegroundColor Red
}

# Test 4: UPDATE USER
if ($userId1) {
    Write-Host "`n=== TEST 4: UPDATE USER ($userId1) ===" -ForegroundColor Green
    $updateData = @{
        job_title = "Senior Software Engineer"
        last_name = "Kumar Singh"
    } | ConvertTo-Json

    try {
        $updateResponse = Invoke-WebRequest -Uri "$baseUrl/$userId1" -Method PATCH -ContentType "application/json" -Body $updateData -UseBasicParsing
        $updateResult = $updateResponse.Content | ConvertFrom-Json
        Write-Host "✓ Success!" -ForegroundColor Green
        Write-Host ($updateResult | ConvertTo-Json)
    } catch {
        Write-Host "✗ Failed: $_" -ForegroundColor Red
    }
}

# Test 5: DELETE USER
if ($userId2) {
    Write-Host "`n=== TEST 5: DELETE USER ($userId2) ===" -ForegroundColor Green
    try {
        $deleteResponse = Invoke-WebRequest -Uri "$baseUrl/$userId2" -Method DELETE -UseBasicParsing
        $deleteResult = $deleteResponse.Content | ConvertFrom-Json
        Write-Host "✓ Success!" -ForegroundColor Green
        Write-Host ($deleteResult | ConvertTo-Json)
    } catch {
        Write-Host "✗ Failed: $_" -ForegroundColor Red
    }
}

# Test 6: GET ALL USERS AFTER MODIFICATIONS
Write-Host "`n=== TEST 6: GET ALL USERS (AFTER CHANGES) ===" -ForegroundColor Green
try {
    $getAllAfter = Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing
    $allUsersAfter = $getAllAfter.Content | ConvertFrom-Json
    Write-Host "✓ Success! Total users now: $($allUsersAfter.Count)" -ForegroundColor Green
    Write-Host ($allUsersAfter | ConvertTo-Json)
} catch {
    Write-Host "✗ Failed: $_" -ForegroundColor Red
}

Write-Host "`n=== ALL TESTS COMPLETED ===" -ForegroundColor Cyan
Write-Host "✓ Check MongoDB Compass at: mongodb://localhost:27017" -ForegroundColor Yellow
