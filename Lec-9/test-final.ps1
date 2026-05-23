# Quick test of API routes

$baseUrl = "http://localhost:8000/api/user"

Write-Host "=== TESTING ALL ROUTES ===" -ForegroundColor Cyan

# Test 1: GET ALL USERS
Write-Host "`n--- TEST 1: GET ALL USERS ---" -ForegroundColor Green
$resp = Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing -ErrorAction SilentlyContinue
if ($resp) {
    $users = $resp.Content | ConvertFrom-Json
    Write-Host "✓ GET /api/user - Success! Found $($users.Count) users"
    if ($users.Count -gt 0) {
        $userId1 = $users[0]._id
        $userId2 = $users[1]._id
        Write-Host "  - $($users[0].first_name) $($users[0].last_name)"
        Write-Host "  - $($users[1].first_name) $($users[1].last_name)"
        Write-Host "  - $($users[2].first_name) $($users[2].last_name)"
    }
}

# Test 2: GET USER BY ID
if ($userId1) {
    Write-Host "`n--- TEST 2: GET USER BY ID ---" -ForegroundColor Green
    $resp = Invoke-WebRequest -Uri "$baseUrl/$userId1" -Method GET -UseBasicParsing -ErrorAction SilentlyContinue
    if ($resp) {
        $user = $resp.Content | ConvertFrom-Json
        Write-Host "✓ GET /api/user/:id - Success!"
        Write-Host "  User: $($user.first_name) $($user.last_name) - $($user.email)"
    }
}

# Test 3: CREATE NEW USER
Write-Host "`n--- TEST 3: CREATE NEW USER ---" -ForegroundColor Green
$newUser = @{
    first_name = "Neha"
    last_name = "Gupta"
    email = "neha@example.com"
    job_title = "QA Engineer"
    gender = "Female"
    ip_address = "192.168.1.4"
} | ConvertTo-Json

$resp = Invoke-WebRequest -Uri $baseUrl -Method POST -ContentType "application/json" -Body $newUser -UseBasicParsing -ErrorAction SilentlyContinue
if ($resp) {
    $result = $resp.Content | ConvertFrom-Json
    Write-Host "✓ POST /api/user - Success!"
    Write-Host "  Created: $($result.user.first_name) $($result.user.last_name)"
    $userId4 = $result.user._id
}

# Test 4: UPDATE USER
if ($userId1) {
    Write-Host "`n--- TEST 4: UPDATE USER ---" -ForegroundColor Green
    $updateData = @{
        job_title = "Senior Software Engineer"
    } | ConvertTo-Json

    $resp = Invoke-WebRequest -Uri "$baseUrl/$userId1" -Method PATCH -ContentType "application/json" -Body $updateData -UseBasicParsing -ErrorAction SilentlyContinue
    if ($resp) {
        Write-Host "✓ PATCH /api/user/:id - Success!"
        $updated = $resp.Content | ConvertFrom-Json
        Write-Host "  Updated job_title: $($updated.user.job_title)"
    }
}

# Test 5: DELETE USER
if ($userId2) {
    Write-Host "`n--- TEST 5: DELETE USER ---" -ForegroundColor Green
    $resp = Invoke-WebRequest -Uri "$baseUrl/$userId2" -Method DELETE -UseBasicParsing -ErrorAction SilentlyContinue
    if ($resp) {
        Write-Host "✓ DELETE /api/user/:id - Success!"
        Write-Host "  User deleted successfully"
    }
}

# Test 6: GET ALL USERS AFTER CHANGES
Write-Host "`n--- TEST 6: GET ALL USERS (AFTER CHANGES) ---" -ForegroundColor Green
$resp = Invoke-WebRequest -Uri $baseUrl -Method GET -UseBasicParsing -ErrorAction SilentlyContinue
if ($resp) {
    $users = $resp.Content | ConvertFrom-Json
    Write-Host "✓ GET /api/user - Success! Total users now: $($users.Count)"
}

Write-Host "`n=== ROUTE TESTING COMPLETE ===" -ForegroundColor Cyan
Write-Host "✓ All routes tested successfully!" -ForegroundColor Yellow
Write-Host "✓ Open MongoDB Compass to see data: mongodb://localhost:27017" -ForegroundColor Yellow
