# Lesson 01｜Hello Robot（零基礎）

**只需：** 已購買的 Waveshare ESP32-S3-LCD-1.47B-M（SKU 31031）、USB-C **資料傳輸線**、MacBook Air M3。

## 目標

第一次完成「安裝 Arduino IDE → 安裝 ESP32 開發板環境 → USB 上傳程式 → Serial Monitor 出現文字」。

## 步驟

1. 從 https://www.arduino.cc/en/software 下載 macOS Apple Silicon 版 Arduino IDE。
2. Arduino IDE → Preferences／Settings → Additional Boards Manager URLs 新增：
   \`https://espressif.github.io/arduino-esp32/package_esp32_index.json\`
3. Boards Manager 搜尋並安裝 **esp32 by Espressif Systems**（官方此板要求 ≥3.0.2）。
4. USB-C 資料線連接 Mac → 選 \`ESP32S3 Dev Module\` 及實際 Port。
5. 若 Serial 沒訊息，檢查 \`USB CDC On Boot = Enabled\`、Serial 115200、重置後再試。
6. 貼上以下程式 → 按 Upload；序列監控器設 115200 baud。

\`\`\`cpp
void setup() {
  Serial.begin(115200);
  delay(1500);
  Serial.println("My AI Pet is starting!");
}

void loop() {
  Serial.println("Hello Robot!");
  delay(1000);
}
\`\`\`

## 驗收

- [ ] IDE 可開啟，Espressif 套件已安裝
- [ ] Mac 看得到正確 Port
- [ ] Upload 成功
- [ ] Serial Monitor 每秒印出 \`Hello Robot!\`

若找不到 Port：先換支援資料傳輸的 USB 線；若燒錄失敗：依原廠的 BOOT／RESET 下載模式教學排除。

**下一堂：** Lesson 02 LCD 官方範例與文字顯示。

原廠文件：https://docs.waveshare.com/ESP32-S3-LCD-1.47B/Arduino
