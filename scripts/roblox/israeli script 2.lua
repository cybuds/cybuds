-- Sleek DigBlock Spammer GUI
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local Remotes = ReplicatedStorage:WaitForChild("Remotes")
local DigBlockRemote = Remotes:WaitForChild("DigBlock")

-- Create GUI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "DigBlockSpammer"
screenGui.ResetOnSpawn = false
screenGui.Parent = player:WaitForChild("PlayerGui")

local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 280, 0, 210)
frame.Position = UDim2.new(0.5, -140, 0.4, 0)
frame.BackgroundColor3 = Color3.fromRGB(22, 22, 28)
frame.BorderSizePixel = 0
frame.Active = true
frame.Draggable = true
frame.Parent = screenGui

Instance.new("UICorner", frame).CornerRadius = UDim.new(0, 16)

-- Title
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, -50, 0, 40)
title.Position = UDim2.new(0, 15, 0, 5)
title.BackgroundTransparency = 1
title.Text = "⛏️ DigBlock Spammer"
title.TextColor3 = Color3.fromRGB(230, 230, 240)
title.TextSize = 17
title.Font = Enum.Font.GothamSemibold
title.TextXAlignment = Enum.TextXAlignment.Left
title.Parent = frame

-- Status
local status = Instance.new("TextLabel")
status.Size = UDim2.new(1, -30, 0, 24)
status.Position = UDim2.new(0, 15, 0, 52)
status.BackgroundTransparency = 1
status.Text = "● Idle"
status.TextColor3 = Color3.fromRGB(180, 180, 190)
status.TextSize = 14
status.Font = Enum.Font.Gotham
status.TextXAlignment = Enum.TextXAlignment.Left
status.Parent = frame

-- Toggle Button
local toggleBtn = Instance.new("TextButton")
toggleBtn.Size = UDim2.new(0.9, 0, 0, 52)
toggleBtn.Position = UDim2.new(0.05, 0, 0, 88)
toggleBtn.BackgroundColor3 = Color3.fromRGB(45, 45, 52)
toggleBtn.Text = "ENABLE DIG SPAM"
toggleBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
toggleBtn.TextSize = 15
toggleBtn.Font = Enum.Font.GothamBold
toggleBtn.Parent = frame

Instance.new("UICorner", toggleBtn).CornerRadius = UDim.new(0, 12)

-- Info
local info = Instance.new("TextLabel")
info.Size = UDim2.new(1, -30, 0, 50)
info.Position = UDim2.new(0, 15, 0, 155)
info.BackgroundTransparency = 1
info.Text = "Hold E while enabled to spam DigBlock\n\nRelease E to stop"
info.TextColor3 = Color3.fromRGB(160, 160, 170)
info.TextSize = 12.5
info.Font = Enum.Font.Gotham
info.TextWrapped = true
info.TextXAlignment = Enum.TextXAlignment.Left
info.Parent = frame

-- Close Button
local closeBtn = Instance.new("TextButton")
closeBtn.Size = UDim2.new(0, 28, 0, 28)
closeBtn.Position = UDim2.new(1, -36, 0, 8)
closeBtn.BackgroundTransparency = 1
closeBtn.Text = "✕"
closeBtn.TextColor3 = Color3.fromRGB(170, 170, 180)
closeBtn.TextSize = 18
closeBtn.Font = Enum.Font.GothamBold
closeBtn.Parent = frame

-- Variables
local enabled = false
local spamming = false
local connection = nil

local function startSpamming()
    if spamming then return end
    spamming = true
    status.Text = "● DIGGING..."
    status.TextColor3 = Color3.fromRGB(0, 255, 140)

    connection = game:GetService("RunService").Heartbeat:Connect(function()
        pcall(function()
            DigBlockRemote:FireServer()
            -- Try these if plain FireServer doesn't work:
            -- DigBlockRemote:FireServer(1)
            -- DigBlockRemote:FireServer(Vector3.new(0,0,0))
        end)
    end)
end

local function stopSpamming()
    spamming = false
    if connection then
        connection:Disconnect()
        connection = nil
    end
    status.Text = "● Idle"
    status.TextColor3 = Color3.fromRGB(180, 180, 190)
end

-- Toggle Button
toggleBtn.MouseButton1Click:Connect(function()
    enabled = not enabled
    if enabled then
        toggleBtn.Text = "DIG SPAM ENABLED (Hold E)"
        toggleBtn.BackgroundColor3 = Color3.fromRGB(70, 190, 90)
    else
        toggleBtn.Text = "ENABLE DIG SPAM"
        toggleBtn.BackgroundColor3 = Color3.fromRGB(45, 45, 52)
        stopSpamming()
    end
end)

-- E Key Controls
UserInputService.InputBegan:Connect(function(input, gp)
    if gp then return end
    if input.KeyCode == Enum.KeyCode.E and enabled then
        startSpamming()
    end
end)

UserInputService.InputEnded:Connect(function(input)
    if input.KeyCode == Enum.KeyCode.E then
        stopSpamming()
    end
end)

-- Close GUI
closeBtn.MouseButton1Click:Connect(function()
    screenGui:Destroy()
end)

print("⛏️ DigBlock GUI loaded! Click the button then hold E to spam.")
