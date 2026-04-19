-- Sleek Minimalist Cash Spammer GUI
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local Remotes = ReplicatedStorage:WaitForChild("Remotes")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "MinimalCashSpammer"
screenGui.ResetOnSpawn = false
screenGui.Parent = player:WaitForChild("PlayerGui")

-- Main Frame
local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 260, 0, 220)
frame.Position = UDim2.new(0.5, -130, 0.4, 0)
frame.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
frame.BorderSizePixel = 0
frame.Active = true
frame.Draggable = true
frame.Parent = screenGui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 16)
corner.Parent = frame

-- Title Bar
local titleBar = Instance.new("Frame")
titleBar.Size = UDim2.new(1, 0, 0, 40)
titleBar.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
titleBar.BorderSizePixel = 0
titleBar.Parent = frame

Instance.new("UICorner", titleBar).CornerRadius = UDim.new(0, 16)

local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, -40, 1, 0)
title.Position = UDim2.new(0, 15, 0, 0)
title.BackgroundTransparency = 1
title.Text = "Cash Spammer"
title.TextColor3 = Color3.fromRGB(220, 220, 230)
title.TextSize = 16
title.Font = Enum.Font.GothamSemibold
title.TextXAlignment = Enum.TextXAlignment.Left
title.Parent = titleBar

-- Status Indicator
local status = Instance.new("TextLabel")
status.Size = UDim2.new(1, -30, 0, 24)
status.Position = UDim2.new(0, 15, 0, 55)
status.BackgroundTransparency = 1
status.Text = "● Stopped"
status.TextColor3 = Color3.fromRGB(255, 90, 90)
status.TextSize = 14
status.Font = Enum.Font.Gotham
status.TextXAlignment = Enum.TextXAlignment.Left
status.Parent = frame

-- Toggle Button (big & clean)
local toggle = Instance.new("TextButton")
toggle.Size = UDim2.new(0.88, 0, 0, 52)
toggle.Position = UDim2.new(0.06, 0, 0, 95)
toggle.BackgroundColor3 = Color3.fromRGB(40, 40, 45)
toggle.Text = "ENABLE SPAM"
toggle.TextColor3 = Color3.fromRGB(255, 255, 255)
toggle.TextSize = 15
toggle.Font = Enum.Font.GothamBold
toggle.Parent = frame

local toggleCorner = Instance.new("UICorner")
toggleCorner.CornerRadius = UDim.new(0, 12)
toggleCorner.Parent = toggle

-- Close Button
local closeBtn = Instance.new("TextButton")
closeBtn.Size = UDim2.new(0, 24, 0, 24)
closeBtn.Position = UDim2.new(1, -32, 0, 8)
closeBtn.BackgroundTransparency = 1
closeBtn.Text = "✕"
closeBtn.TextColor3 = Color3.fromRGB(180, 180, 190)
closeBtn.TextSize = 18
closeBtn.Font = Enum.Font.Gotham
closeBtn.Parent = titleBar

-- Variables
local enabled = false
local spamming = false
local connection = nil

local function tryInvoke(name, arg)
    local remote = Remotes:FindFirstChild(name)
    if not remote then return end
    pcall(function()
        if remote:IsA("RemoteFunction") then
            if arg ~= nil then
                remote:InvokeServer(arg)
            else
                remote:InvokeServer()
            end
        elseif remote:IsA("RemoteEvent") then
            if arg ~= nil then
                remote:FireServer(arg)
            else
                remote:FireServer()
            end
        end
    end)
end

local function startSpamming()
    if spamming then return end
    spamming = true
    status.Text = "● SPAMMING"
    status.TextColor3 = Color3.fromRGB(0, 255, 120)
    
    connection = game:GetService("RunService").Heartbeat:Connect(function()
        tryInvoke("ClaimDaily")
        tryInvoke("ClaimPlaytimeReward")
        tryInvoke("ClaimQuest")
        tryInvoke("GetDailyInfo")
        
        tryInvoke("AdminCash")
        tryInvoke("AdminCash", 1)
        tryInvoke("AdminCash", 100)
        tryInvoke("AdminCash", "give")
    end)
end

local function stopSpamming()
    spamming = false
    if connection then
        connection:Disconnect()
        connection = nil
    end
    status.Text = "● Stopped"
    status.TextColor3 = Color3.fromRGB(255, 90, 90)
end

-- Toggle Click
toggle.MouseButton1Click:Connect(function()
    enabled = not enabled
    
    if enabled then
        toggle.Text = "SPAM ENABLED (Hold E)"
        toggle.BackgroundColor3 = Color3.fromRGB(70, 180, 80)
    else
        toggle.Text = "ENABLE SPAM"
        toggle.BackgroundColor3 = Color3.fromRGB(40, 40, 45)
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

-- Smooth open animation
frame.Size = UDim2.new(0, 0, 0, 0)
frame:TweenSize(UDim2.new(0, 260, 0, 220), "Out", "Quad", 0.4, true)

print("gui loaded")
task.wait(2)
print("tung nation, we da best coders")