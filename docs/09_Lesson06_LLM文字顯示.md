# Lesson 06｜ESP32 串接 LLM，讓回答顯示在 LCD

版本 v1.0｜2026-11-12｜**課程設計稿：尚未經實機編譯、部署或測試**

## 最終成果

ESP32-S3-LCD-1.47B-M 自己連上 Wi-Fi，發出預設問題，例如 \`Say hello as a cute pet in one sentence\`，取得雲端 LLM 的回答後，顯示在板上 172×320 LCD。**不需要額外購買任何模組**，但真實 LLM API 可能收費。

\`\`\`text
ESP32（USB-C 供電）
  └─ Wi-Fi (2.4 GHz)
       └─ HTTPS → Cloudflare Worker（認證與限流）
                       └─ Secret：LLM API Key
                       └─ LLM API
                       ← 精簡答案
       ← HTTPS：純文字答案
  ├─ Serial Monitor：先印答案／錯誤
  └─ LCD：LVGL Label 顯示短句
\`\`\`

## 前置課程

- L01：能上傳程式並從 Serial 看到文字。
- L02：Waveshare **本板型**官方 \`LVGL_Arduino\` 範例能點亮 LCD。
- L05：ESP32 已能連上 2.4GHz Wi-Fi，並進行基本網路請求。

原廠 LCD 範例請依 [Waveshare 官方 Arduino 教學](https://docs.waveshare.com/ESP32-S3-LCD-1.47B/Arduino) 安裝相容版本（原廠列 LVGL **8.3.10**、Arduino-ESP32 **≥3.0.2**）。不要直接套用其他 ESP32-S3 螢幕的 GPIO。

## 06-A：先顯示固定英文字串

在**原廠 LCD 已初始化的 LVGL 範例**中新增一個 label（示意片段，不是可獨立編譯的完整 sketch）：

\`\`\`cpp
lv_obj_t *answerLabel = lv_label_create(lv_scr_act());
lv_obj_set_width(answerLabel, 150);
lv_label_set_long_mode(answerLabel, LV_LABEL_LONG_WRAP);
lv_label_set_style_text_align(answerLabel, LV_TEXT_ALIGN_CENTER, 0);
lv_label_set_text(answerLabel, "Hello! I am your AI pet.");
lv_obj_center(answerLabel);
\`\`\`

**驗收：** 螢幕看到字母、換行正常、不超出邊界。LCD 方向／螢幕初始化依原廠範例，勿單獨複製本片段就按編譯。

## 06-B：取得遠端固定文字

建一個暫時只回應 \`Hello from the cloud!\` 的 HTTPS 測試端點。ESP32 經 Wi-Fi 傳送請求後，先把結果印到 Serial，再把取得的字串交給 LVGL Label。第一階段不需要 LLM API Key。

**實作原則：** 使用 \`WiFi.h\`、\`WiFiClientSecure.h\`、\`HTTPClient.h\`；在伺服端驗證裝置身分，ESP32 要正確**驗證伺服器憑證**。不要將 \`setInsecure()\` 當正式解法。從本地端服務改成雲端 Worker 時要更新 TLS 憑證信任設定。

## 06-C：換成真正 LLM

建議使用 Cloudflare Workers 當作 ESP32 與 LLM 之間的**代理**，不用把第三方 API Key 寫進 ESP32 韌體或公開 GitHub。Worker 的環境變數要設為 **Secret**，而非純文字。可以在 Cloudflare 控制台的 **Workers & Pages → Worker → Settings → Variables and Secrets** 設定。

建議 API 合約（供後續完整程式實作）：

\`\`\`http
POST /ask
Authorization: Bearer <DEVICE_TOKEN>
Content-Type: application/json

{"question":"Say hello as a cute pet in one sentence."}

HTTP 200
Content-Type: text/plain; charset=utf-8

Hello! I am your AI pet.
\`\`\`

伺服端還要做輸入長度限制、裝置驗證、每分鐘請求次數限制、回覆字數限制、逾時處理、LLM API 成本控制。**不公開 Worker 的無保護付費端點**。試作前先選服務商和模型、確認目前 API 定價及用量設定。OpenAI API 與 ChatGPT 訂閱**分開計費**。

## 06-D：將回答放在螢幕文字區

處理流程：先以 \`Serial.println(reply)\` 確認回答，再更新 LVGL Label，例如 \`lv_label_set_text(answerLabel, reply.c_str());\`；顯示操作需在 LVGL 執行緒／安全上下文處理，不能任意跨執行緒直接更新。

因為 LCD 只有 **172×320**，第一版限定每次回覆 1～2 句、短文字，超出則截斷或分頁。建議先讓 LLM 回傳英文字串。

⚠️ **繁體中文需要字型**：LVGL 預設字型可能缺少中文字形，會顯示方塊。L07 將學習 LVGL 中文子集字型／字體轉檔與分頁，不能把不能顯示中文誤認為 LLM API 失敗。

## 06 驗收清單

- [ ] LCD 可顯示固定英文字串
- [ ] ESP32 成功連上 Wi-Fi
- [ ] HTTPS 測試端點可回應固定文字
- [ ] Serial 印出後端回覆
- [ ] LLM 問答成功，Worker 的 API Key 由 Secret 保管
- [ ] 短回答顯示在 LCD 且能換行
- [ ] 斷 Wi-Fi 或 LLM 超時時，裝置能顯示錯誤而不當機
- [ ] 沒有將 Wi-Fi 密碼、API Key、裝置權杖提交到 GitHub

## 下一堂

L07：繁體中文 LVGL 字型、文字溢出與分頁。之後才接麥克風及喇叭。
