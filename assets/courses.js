window.PET_COURSES = [
  {
    "id": "01",
    "title": "讓 ESP32 說 Hello",
    "short": "IDE、USB 連線、序列監控器",
    "stage": "基礎連線",
    "minutes": 50,
    "icon": "terminal",
    "level": "零基礎",
    "goal": "成功上傳第一支 Arduino 程式，從序列監控器讀到 Hello Robot。",
    "tools": [
      "ESP32-S3-LCD-1.47B-M",
      "USB-C 資料線",
      "Mac + Arduino IDE"
    ],
    "status": "可開始",
    "sections": [
      {
        "title": "認識 ESP32 的運作方式",
        "body": "開發時，電腦負責編輯與上傳程式；ESP32 負責執行；Serial Monitor 是我們觀察晶片輸出的視窗。這一步不需要麥克風、馬達或外殼。",
        "points": [
          "setup() 只在開機時執行一次",
          "loop() 會持續重複執行",
          "delay(1000) 是等待 1000 毫秒，也就是 1 秒"
        ]
      },
      {
        "title": "安裝與選擇開發板",
        "body": "從 Arduino 官網安裝 macOS Apple Silicon 版 IDE。在 Settings 的 Additional Boards Manager URLs 輸入 ESP32 套件網址，再安裝 esp32 by Espressif Systems。",
        "points": [
          "https://espressif.github.io/arduino-esp32/package_esp32_index.json",
          "Board 選 ESP32S3 Dev Module，Port 選實際 USB 裝置",
          "若沒出現序列訊息，確認 USB CDC On Boot = Enabled，重新上傳並按 RESET"
        ]
      },
      {
        "title": "上傳第一支程式",
        "body": "將以下程式貼到 Arduino IDE，按 Upload，接著將 Serial Monitor 的速率設為 115200。若失敗，優先檢查 USB 是否支援資料傳輸，而非只充電。",
        "codeTitle": "Lesson 01｜完整可上傳範例",
        "code": "void setup() {\n  Serial.begin(115200);\n  delay(1500);\n  Serial.println(\"My AI Pet is starting!\");\n}\n\nvoid loop() {\n  Serial.println(\"Hello Robot!\");\n  delay(1000);\n}",
        "points": [
          "先看上傳是否成功，再觀察 Serial Monitor",
          "不要把「線上模擬成功」誤認為「ESP32 實機成功」"
        ]
      }
    ],
    "lab": {
      "type": "serial",
      "title": "序列監控器模擬",
      "description": "點「模擬執行」看看序列監控器會顯示什麼。這個模擬不會上傳到實體 ESP32。",
      "action": "模擬執行"
    },
    "challenge": "把 Hello Robot! 改成你的寵物名字，再上傳一次。",
    "quiz": [
      {
        "q": "setup() 一般會執行幾次？",
        "options": [
          "每秒一次",
          "開機時一次",
          "永遠不執行"
        ],
        "answer": 1,
        "why": "setup() 用來初始化，通常在開機或重置時執行一次。"
      },
      {
        "q": "序列監控器亂碼時，優先確認什麼？",
        "options": [
          "Baud Rate 是否與程式一致",
          "喇叭有沒有接線",
          "機器人外殼尺寸"
        ],
        "answer": 0,
        "why": "序列傳輸速率需與 Serial.begin(115200) 一致。"
      }
    ],
    "checks": [
      "Arduino IDE 與 ESP32 開發環境已安裝",
      "Mac 偵測到主板的 Port",
      "程式上傳成功",
      "實機 Serial Monitor 顯示 Hello Robot"
    ],
    "links": [
      [
        "Arduino IDE",
        "https://www.arduino.cc/en/software"
      ],
      [
        "Espressif Arduino-ESP32 安裝",
        "https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html"
      ]
    ]
  },
  {
    "id": "02",
    "title": "點亮第一個螢幕",
    "short": "LCD、LVGL、顯示文字",
    "stage": "圖像介面",
    "minutes": 70,
    "icon": "monitor",
    "level": "初階",
    "goal": "使用 Waveshare 官方範例成功驅動 1.47 吋 LCD，並加上一行 Hello AI!。",
    "tools": [
      "ESP32-S3-LCD-1.47B-M",
      "Arduino IDE",
      "Waveshare 官方範例與相容函式庫"
    ],
    "status": "可開始",
    "sections": [
      {
        "title": "LCD 和一般電腦螢幕的差異",
        "body": "這塊板子內建 172×320 像素的 ST7789 螢幕。ESP32 必須透過特定 GPIO 與驅動函式庫才能畫面更新，所以不能任意套用別款 ESP32 LCD 程式。",
        "points": [
          "Waveshare 官方示例名稱為 LVGL_Arduino",
          "官方所列 LVGL 版本為 8.3.10，PNGdec 另有相容版本",
          "先跑通官方範例，再修改畫面"
        ]
      },
      {
        "title": "跑通原廠範例",
        "body": "下載官方範例，按照 Arduino 教學安裝對應函式庫。確認開發板與上傳設定後，先不要改程式，讓板子顯示出官方測試畫面。",
        "points": [
          "下載正確型號 ESP32-S3-LCD-1.47B 的範例",
          "螢幕不亮先排查電源、範例版本與設定",
          "不要刪除 LCD_Init() 與 Lvgl_Init() 之類初始化流程"
        ]
      },
      {
        "title": "新增自己的第一個文字標籤",
        "body": "在官方 LVGL 已經初始化完成的程式中，適當位置建立標籤。下面是 LVGL 8 片段，不能單獨直接編譯，需要搭配官方螢幕初始化。",
        "codeTitle": "LVGL 8｜插入到已初始化的官方專案",
        "code": "lv_obj_t *label = lv_label_create(lv_scr_act());\nlv_label_set_text(label, \"Hello AI!\");\nlv_obj_center(label);",
        "points": [
          "先顯示短英文，降低字型問題",
          "若畫面方向不同，以原廠範例為準"
        ]
      }
    ],
    "lab": {
      "type": "lcd",
      "title": "LCD 文字排版練習",
      "description": "修改預覽中的英文短句，觀察在狹窄的 1.47 吋螢幕上會如何換行。",
      "action": "更新螢幕"
    },
    "challenge": "把文字換成 My AI Pet，調整顯示位置並拍下實機照片。",
    "quiz": [
      {
        "q": "為什麼先用 Waveshare 官方範例？",
        "options": [
          "因為 ESP32 沒有 Wi-Fi",
          "因為 LCD 的腳位和初始化因板型而異",
          "因為 Arduino 不支援程式"
        ],
        "answer": 1,
        "why": "不同模組的 LCD 接線與初始化流程可能完全不同。"
      },
      {
        "q": "LVGL 的標籤建立程式可以直接單獨編譯嗎？",
        "options": [
          "可以，不用初始化",
          "不行，需要 LCD 與 LVGL 先初始化",
          "只能在手機使用"
        ],
        "answer": 1,
        "why": "標籤只是畫面元件，必須有已運行的 LVGL 顯示環境。"
      }
    ],
    "checks": [
      "已安裝原廠相容函式庫",
      "官方 LCD 測試畫面顯示正常",
      "畫面成功顯示 Hello AI!",
      "已記錄使用的 Arduino、LVGL 版本"
    ],
    "links": [
      [
        "Waveshare Arduino 教學",
        "https://docs.waveshare.com/ESP32-S3-LCD-1.47B/Arduino"
      ],
      [
        "LVGL 8 官方文件",
        "https://docs.lvgl.io/8.3/"
      ]
    ]
  },
  {
    "id": "03",
    "title": "讓小寵物有表情",
    "short": "眼睛、眨眼、狀態切換",
    "stage": "圖像介面",
    "minutes": 60,
    "icon": "smile",
    "level": "初階",
    "goal": "在 LCD 畫出可愛眼睛，實作眨眼與心情切換。",
    "tools": [
      "完成 L02 的 LCD 範例"
    ],
    "status": "可開始",
    "sections": [
      {
        "title": "讓介面有生命感",
        "body": "我們不是只顯示圖片，而是用圖形元件畫出眼睛、嘴巴、眉毛，讓表情隨狀態改變。第一版只做 Happy、Thinking、Sleepy 三種狀態。",
        "points": [
          "Happy：大眼睛和微笑",
          "Thinking：眼睛移動、顯示思考文字",
          "Sleepy：眼睛閉上並降低更新頻率"
        ]
      },
      {
        "title": "動畫不是不停重畫全部畫面",
        "body": "優先更改既有圖形的位置、大小或顏色，避免整頁刷新造成閃爍。每隔一段時間更新表情，別在主程式使用長時間的 delay() 阻塞其他任務。",
        "points": [
          "先讓 2 秒眨眼一次，再加入隨機間隔",
          "動畫完成後要能停止或切換狀態",
          "先從預覽練習，實機再調整細節"
        ]
      },
      {
        "title": "用狀態變數管理表情",
        "body": "把表情切換寫成可維護的邏輯，未來 LLM 回答時也能進入 Thinking 狀態。",
        "codeTitle": "表情狀態｜邏輯範例",
        "code": "enum PetMood { HAPPY, THINKING, SLEEPY };\nPetMood mood = HAPPY;\n\nvoid setMood(PetMood nextMood) {\n  mood = nextMood;\n  // 在 LVGL 已初始化的環境更新眼睛圖形\n}",
        "points": [
          "這是邏輯骨架，不是獨立可上傳的完整程式"
        ]
      }
    ],
    "lab": {
      "type": "eyes",
      "title": "表情設計器",
      "description": "切換三種表情並試試眨眼動畫，想像未來 AI 回答時的視覺反應。",
      "action": "眨眼"
    },
    "challenge": "想一個專屬表情，寫下它在什麼情境出現。",
    "quiz": [
      {
        "q": "要讓 AI 回答前看起來在思考，最適合使用哪個狀態？",
        "options": [
          "SLEEPY",
          "THINKING",
          "ERROR"
        ],
        "answer": 1,
        "why": "把 Thinking 與網路請求綁定，使用者就知道機器人正在工作。"
      },
      {
        "q": "為何要避免使用很長的 delay()？",
        "options": [
          "可能阻擋其他任務更新",
          "會把螢幕燒掉",
          "無法使用字串"
        ],
        "answer": 0,
        "why": "阻塞式等待會降低畫面與網路的即時性。"
      }
    ],
    "checks": [
      "預覽三種表情",
      "實機至少畫出兩隻眼睛",
      "實機能切換表情",
      "完成一次眨眼動畫"
    ],
    "links": [
      [
        "LVGL 文件",
        "https://docs.lvgl.io/8.3/"
      ]
    ]
  },
  {
    "id": "04",
    "title": "感應搖晃與傾斜",
    "short": "六軸感測、事件判斷",
    "stage": "感測互動",
    "minutes": 55,
    "icon": "activity",
    "level": "初階",
    "goal": "讀取板載 QMI8658 六軸感測器，讓小寵物感應拿起、傾斜等動作。",
    "tools": [
      "ESP32-S3-LCD-1.47B-M",
      "原廠 QMI8658 範例"
    ],
    "status": "可開始",
    "sections": [
      {
        "title": "加速度計與陀螺儀",
        "body": "QMI8658 同時量測加速度和角速度。它不會直接告訴你『主人抱起我了』，而是提供數值，需要用程式制定判斷門檻。",
        "points": [
          "X、Y、Z 加速度：方向與移動線索",
          "X、Y、Z 角速度：旋轉的線索",
          "先讀數字，再設計事件"
        ]
      },
      {
        "title": "先比對原廠資料",
        "body": "在官方示例中找到 QMI8658 初始化和數值讀取程式。將三個方向的數值輸出到 Serial Monitor，平放、拿起、傾斜時做比較。",
        "points": [
          "先記下平放時的基準值",
          "同一動作至少測試三次",
          "勿直接複製別款 IMU 的腳位及函式名"
        ]
      },
      {
        "title": "用條件式做動作回應",
        "body": "下面是示意邏輯，threshold 要按實測資料修正，不是通用標準。",
        "codeTitle": "感測器判斷｜概念虛擬碼",
        "code": "// 假設 tiltDegrees 已由感測數據算出\nif (abs(tiltDegrees) > 25) {\n  // 切換到 Surprised 表情\n} else {\n  // 保持 Happy 表情\n}",
        "points": [
          "感測器原始值與角度計算是兩回事",
          "增加去抖動與連續多次判斷，以免誤觸發"
        ]
      }
    ],
    "lab": {
      "type": "imu",
      "title": "傾斜門檻模擬",
      "description": "用滑桿模擬傾斜角度，觀察數值跨過門檻時表情如何變化。",
      "action": ""
    },
    "challenge": "拿起主板後至少記錄三筆 X/Y/Z 數值，嘗試找出平放與傾斜差異。",
    "quiz": [
      {
        "q": "QMI8658 提供的是什麼？",
        "options": [
          "直接判斷人的心情",
          "加速度與角速度數值",
          "LLM 的文字答案"
        ],
        "answer": 1,
        "why": "是否被拿起需自行從測量值推論。"
      },
      {
        "q": "傾斜動作一直誤觸發，應先做什麼？",
        "options": [
          "調整門檻並加入去抖動",
          "購買更大喇叭",
          "刪除所有程式"
        ],
        "answer": 0,
        "why": "量測訊號可能有雜訊，需要門檻與時間判斷。"
      }
    ],
    "checks": [
      "找到 QMI8658 官方示例",
      "Serial 顯示感測數值",
      "拿起／傾斜時數值有變化",
      "設計並驗證一次觸發條件"
    ],
    "links": [
      [
        "Waveshare 產品與原理圖",
        "https://docs.waveshare.com/ESP32-S3-LCD-1.47B"
      ]
    ]
  },
  {
    "id": "05",
    "title": "讓 ESP32 連上網路",
    "short": "Wi-Fi、HTTPS、回傳資料",
    "stage": "網路能力",
    "minutes": 65,
    "icon": "wifi",
    "level": "初階",
    "goal": "連上家中 2.4 GHz Wi-Fi，從 HTTPS 測試端點取得文字並顯示在 Serial。",
    "tools": [
      "ESP32-S3-LCD-1.47B-M",
      "2.4 GHz Wi-Fi",
      "Arduino IDE"
    ],
    "status": "可開始",
    "sections": [
      {
        "title": "Wi-Fi 和 HTTPS 是不同的事",
        "body": "Wi-Fi 是連上區域網路；HTTPS 是透過網路取得資料。應分兩關驗證：先 WiFi.status() == WL_CONNECTED，再確認 HTTPS 狀態碼為 200。",
        "points": [
          "ESP32-S3 支援 2.4 GHz Wi-Fi",
          "SSID、密碼只放在電腦上的本地設定，絕對不要上傳至公開 GitHub",
          "DNS、TLS 憑證、逾時都可能讓 HTTPS 失敗"
        ]
      },
      {
        "title": "最簡單的連線測試",
        "body": "以下程式需自行將本地 ssid 與 password 變數設為實際資料，別把含密碼的檔案提交 GitHub。",
        "codeTitle": "完整 Arduino Wi-Fi 狀態範例（本機設定）",
        "code": "#include <WiFi.h>\n\nconst char* ssid = \"YOUR_WIFI_NAME\";\nconst char* password = \"YOUR_WIFI_PASSWORD\";\n\nvoid setup() {\n  Serial.begin(115200);\n  WiFi.begin(ssid, password);\n  unsigned long start = millis();\n  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {\n    delay(400);\n    Serial.print(\".\");\n  }\n  if (WiFi.status() == WL_CONNECTED) {\n    Serial.println(\"\\nWi-Fi connected!\");\n    Serial.println(WiFi.localIP());\n  } else {\n    Serial.println(\"\\nWi-Fi timeout\");\n  }\n}\n\nvoid loop() {}",
        "points": [
          "這份程式只測試 Wi-Fi 連線，不會呼叫 LLM",
          "正式練習時將設定抽到不提交的 secrets.h"
        ]
      },
      {
        "title": "HTTPS：先固定文字再接 AI",
        "body": "先確認設備能連線並取得固定英文字串。使用 WiFiClientSecure 做正式 HTTPS 時要驗證伺服器憑證，不能用 setInsecure() 當成正式安全方案。",
        "points": [
          "先印出 HTTP 狀態碼及伺服器回應",
          "加上逾時和失敗訊息",
          "取得文字後才開始送到 LCD"
        ]
      }
    ],
    "lab": {
      "type": "wifi",
      "title": "網路狀態排錯練習",
      "description": "選擇網路問題情境，練習判斷是 Wi-Fi、HTTPS 還是伺服器端錯誤。",
      "action": "檢查情境"
    },
    "challenge": "用 Serial 印出 Wi-Fi 連線狀態與本地 IP，記錄成功連線所需秒數。",
    "quiz": [
      {
        "q": "ESP32-S3 這塊板子要連哪種 Wi-Fi 頻段？",
        "options": [
          "只有 5 GHz",
          "2.4 GHz",
          "只能用有線網路"
        ],
        "answer": 1,
        "why": "此板 Wi-Fi 支援 2.4 GHz。"
      },
      {
        "q": "為什麼不建議在正式程式使用 setInsecure()？",
        "options": [
          "會取消 TLS 伺服器身分驗證",
          "會讓螢幕沒電",
          "會自動免費呼叫 AI"
        ],
        "answer": 0,
        "why": "需要驗證憑證，避免與冒名的 HTTPS 服務通訊。"
      }
    ],
    "checks": [
      "Serial 成功顯示 Wi-Fi connected",
      "能印出本地 IP",
      "能從 HTTPS 測試端點收到文字",
      "本地 Wi-Fi 密碼未提交 GitHub"
    ],
    "links": [
      [
        "Espressif Arduino Wi-Fi",
        "https://docs.espressif.com/projects/arduino-esp32/en/latest/api/wifi.html"
      ]
    ]
  },
  {
    "id": "06",
    "title": "第一次和 LLM 對話",
    "short": "Wi-Fi → AI → LCD 文字",
    "stage": "AI 里程碑",
    "minutes": 90,
    "icon": "sparkles",
    "level": "核心課",
    "goal": "讓 ESP32 詢問雲端 LLM，取得一句回答並顯示在 1.47 吋螢幕。",
    "tools": [
      "完成 L02 的 LCD 顯示",
      "完成 L05 的 Wi-Fi",
      "Cloudflare Worker（可先固定回覆）",
      "LLM API（實際呼叫可能收費）"
    ],
    "status": "核心課程",
    "sections": [
      {
        "title": "ESP32 不會直接在板上跑大型 LLM",
        "body": "它只負責發送問題、接收回覆與更新 LCD。模型在雲端服務運行，因此要考慮網路、回覆長度、API 費用及安全。先不要接麥克風，先讓文字走通。",
        "points": [
          "ESP32 → HTTPS → Cloudflare Worker → LLM",
          "Worker 保存 LLM API Key，不放在公開網頁或 ESP32 韌體",
          "第一版只要求 1～2 句英文，避免中文字型與畫面溢出"
        ]
      },
      {
        "title": "四個關卡，逐步除錯",
        "body": "06-A 固定文字上 LCD；06-B ESP32 讀取雲端固定回覆；06-C Worker 轉送問題給 LLM；06-D LCD 顯示真正答案。每一關先 Serial 印結果，再更新 LCD。",
        "points": [
          "先別急著付款開 API，06-A/B 可完全使用假資料",
          "Worker 需要裝置驗證、請求次數限制、錯誤處理及成本上限",
          "瀏覽器互動示意不是實際連線到 LLM"
        ]
      },
      {
        "title": "設計容易測試的 API 合約",
        "body": "我們先用單純的 HTTP API 概念，ESP32 只收到文字，不必解析複雜的模型 JSON 回應。",
        "codeTitle": "API 設計示意（非可直接執行）",
        "code": "POST /ask\nAuthorization: Bearer <DEVICE_TOKEN>\nContent-Type: application/json\n\n{\"question\":\"Say hello as a friendly pet.\"}\n\nHTTP 200\nContent-Type: text/plain; charset=utf-8\n\nHello! I'm your little robot friend.",
        "points": [
          "DEVICE_TOKEN 和模型 API Key 必須分開管理",
          "回覆長度建議暫限 80～100 個英文字元",
          "遇到 401、429、5xx 與逾時時顯示安全錯誤訊息"
        ]
      }
    ],
    "lab": {
      "type": "llm",
      "title": "LLM 互動流程模擬器",
      "description": "輸入一個問題，模擬送出、等待與收到短句；此區不連外部 AI，也不需輸入真實 API Key。",
      "action": "模擬送出"
    },
    "challenge": "請設計 3 句給 AI 寵物的提示詞，每句回答控制在 80 個英文字元以內。",
    "quiz": [
      {
        "q": "LLM API Key 最適合放在哪裡？",
        "options": [
          "公開 GitHub README",
          "Cloudflare Worker Secret",
          "ESP32 外殼貼紙"
        ],
        "answer": 1,
        "why": "代理服務能保護私密 API Key，並集中限制用量。"
      },
      {
        "q": "Serial 已收到英文回答，但 LCD 顯示方塊，最可能是？",
        "options": [
          "字型缺字或顯示處理",
          "LLM 完全沒回答",
          "馬達電源不足"
        ],
        "answer": 0,
        "why": "將網路成功與字型顯示分開驗證，能更快定位問題。"
      }
    ],
    "checks": [
      "LCD 顯示固定短句",
      "Wi-Fi 能取得雲端固定文字",
      "Worker 已啟用認證與 Secret",
      "取得真實 LLM 短回覆並顯示在 LCD"
    ],
    "links": [
      [
        "完整 L06 Markdown 教學",
        "../docs/09_Lesson06_LLM文字顯示.md"
      ],
      [
        "Cloudflare Workers Secret",
        "https://developers.cloudflare.com/workers/configuration/secrets/"
      ],
      [
        "OpenAI API 定價",
        "https://openai.com/api/pricing/"
      ]
    ]
  },
  {
    "id": "07",
    "title": "繁體中文出現在螢幕",
    "short": "字型、換行、分頁",
    "stage": "AI 里程碑",
    "minutes": 75,
    "icon": "type",
    "level": "進階入門",
    "goal": "讓 LCD 正確顯示繁體中文短句，避免亂碼、缺字或超出螢幕。",
    "tools": [
      "完成 L06 文字串接",
      "LVGL 8.3.10 相容字型"
    ],
    "status": "可開始",
    "sections": [
      {
        "title": "為什麼英文能顯示，中文卻是方框？",
        "body": "繁體中文字形比英文字母多很多；LVGL 預設字型未必包含所有中文字。問題通常不是 LLM 沒有回答，而是顯示字型與 UTF-8 字串處理。",
        "points": [
          "ESP32 收到的文字要保持 UTF-8",
          "使用包含目標字形的 LVGL 字型",
          "記憶體有限，先做常用字子集，之後再擴大"
        ]
      },
      {
        "title": "小螢幕的閱讀設計",
        "body": "172×320 的面積不適合一次塞滿長文。我們把答案控制在短句，使用適當字級、行距、換行和分頁。",
        "points": [
          "一次顯示約 1～2 句",
          "有思考中、成功、失敗三種狀態",
          "不捲動時也要能看懂目前頁數"
        ]
      },
      {
        "title": "先確保顯示範圍",
        "body": "下列片段示範 LVGL 標籤設定寬度與換行，在字型載入成功後再測繁中。",
        "codeTitle": "LVGL 8｜在初始化完成的工程內使用",
        "code": "lv_obj_set_width(answerLabel, 150);\nlv_label_set_long_mode(answerLabel, LV_LABEL_LONG_WRAP);\nlv_obj_set_style_text_align(answerLabel, LV_TEXT_ALIGN_CENTER, 0);\n// 需先設定包含中文字形的 LVGL 字型",
        "points": [
          "中文測試句：你好，我是你的 AI 寵物。",
          "預覽只驗證排版觀念；實機須載入真實中文字型"
        ]
      }
    ],
    "lab": {
      "type": "font",
      "title": "中文顯示與分頁模擬",
      "description": "調整字級、回覆長度，預覽同一個螢幕如何顯示短句。",
      "action": "切換下一頁"
    },
    "challenge": "讓實機顯示「你好，我是你的 AI 寵物。」並記錄實際使用的字型檔案。",
    "quiz": [
      {
        "q": "Serial 正常印出中文，但 LCD 顯示方塊，先檢查什麼？",
        "options": [
          "LCD 所用字型是否包含中文字形",
          "馬達供電電流",
          "USB 線顏色"
        ],
        "answer": 0,
        "why": "程式字串和顯示字型是兩個不同環節。"
      },
      {
        "q": "小螢幕顯示很長的 LLM 回覆，最佳初步策略？",
        "options": [
          "字體縮到 3px",
          "控制回覆長度並分頁",
          "一次全部塞入"
        ],
        "answer": 1,
        "why": "可讀性比一次呈現全部文字重要。"
      }
    ],
    "checks": [
      "字串格式確認是 UTF-8",
      "中文字型可在 LVGL 專案載入",
      "至少一行繁體中文正確顯示",
      "長文字能換行或分頁"
    ],
    "links": [
      [
        "LVGL 字型文件",
        "https://docs.lvgl.io/8.3/overview/font.html"
      ]
    ]
  },
  {
    "id": "08",
    "title": "讓寵物聽見與說話",
    "short": "I²S 麥克風、音訊放大器",
    "stage": "硬體擴充",
    "minutes": 85,
    "icon": "volume",
    "level": "硬體實驗",
    "goal": "先獨立測試 INMP441 收音及 MAX98357A 播放，再整合成語音互動。",
    "tools": [
      "INMP441 預焊版",
      "MAX98357A 預焊版",
      "8Ω 1W 帶線喇叭",
      "確認後的配線與腳位"
    ],
    "status": "需新零件",
    "sections": [
      {
        "title": "音訊從哪裡來？",
        "body": "INMP441 將聲音轉成 I²S 數位資料；MAX98357A 將 I²S 音訊資料轉成可推動喇叭的訊號。I²S 的腳位需依已使用的 LCD／感測器資源重新分配。",
        "points": [
          "I²S 不是 Wi-Fi，也不是一般 UART",
          "INMP441 電源使用 3.3V",
          "MAX98357A 與喇叭的供電、輸出規格需依實際模組確認"
        ]
      },
      {
        "title": "音訊實驗分開做",
        "body": "先把錄音數據輸出或作簡單音量偵測，再使用測試音播放。確認兩者正常才加入語音辨識及合成，避免一次同時除錯多個問題。",
        "points": [
          "核對模組的焊接版和實際端子",
          "量測電源正負極與共地",
          "不要將喇叭直接接到 ESP32 GPIO"
        ]
      },
      {
        "title": "硬體腳位是待驗證資料",
        "body": "以下是規劃表，不是已確定的 GPIO 接線圖。只有檢查實際 PCB、原理圖和既有 GPIO 占用後才可接線。",
        "codeTitle": "音訊配線表（待填）",
        "code": "INMP441  VDD → 3.3V\nINMP441  GND → GND\nINMP441  WS / SCK / SD → GPIO（待核對）\nMAX98357A DIN / BCLK / LRC → GPIO（待核對）\nMAX98357A SPK+ / SPK- → 喇叭兩線",
        "points": [
          "MAX98357A 的 SPK- 不是 ESP32 的 GND",
          "音訊範例會在確定接線後建立"
        ]
      }
    ],
    "lab": {
      "type": "audio",
      "title": "聲音訊號流程模擬",
      "description": "點按鈕觀察「麥克風 → 數位資料 → AI → 喇叭」的處理順序。",
      "action": "模擬聲音流程"
    },
    "challenge": "畫出 INMP441 與 MAX98357A 的腳位表，不填未確認的 GPIO。",
    "quiz": [
      {
        "q": "INMP441 的作用是？",
        "options": [
          "播放聲音",
          "將聲音轉成數位訊號",
          "控制馬達"
        ],
        "answer": 1,
        "why": "INMP441 是數位 MEMS 麥克風。"
      },
      {
        "q": "MAX98357A 的 SPK- 腳位應接到哪裡？",
        "options": [
          "喇叭負端",
          "ESP32 GND",
          "電腦 USB"
        ],
        "answer": 0,
        "why": "它是音訊放大輸出的一端，不應被直接短接到系統 GND。"
      }
    ],
    "checks": [
      "確認所有音訊模組實際供電與腳位",
      "麥克風能測得聲音變化",
      "喇叭能播放測試音",
      "未把 MAX98357A SPK- 接到 GND"
    ],
    "links": [
      [
        "ESP32 官方文件",
        "https://docs.espressif.com/projects/arduino-esp32/en/latest/"
      ]
    ]
  },
  {
    "id": "09",
    "title": "點頭與轉頭",
    "short": "PCA9685、雙 SG90、5V 供電",
    "stage": "硬體擴充",
    "minutes": 85,
    "icon": "move",
    "level": "硬體實驗",
    "goal": "安全控制兩顆 SG90，先做單軸小角度動作，再設計雙軸機構。",
    "tools": [
      "SG90 180° ×2",
      "PCA9685（待確認焊接版）",
      "獨立 5V/2A 電源與適合線材"
    ],
    "status": "需新零件",
    "sections": [
      {
        "title": "馬達不能直接吃 ESP32 3.3V",
        "body": "SG90 啟動與卡住時可能瞬間拉高電流，因此採用獨立 5V 馬達電源。ESP32 與 PCA9685 共享 GND，但不要把兩個獨立 5V 正極直接相連。",
        "points": [
          "PCA9685 的 VCC 是邏輯側，V+ 是伺服側電源",
          "伺服馬達紅線通常是 5V、棕／黑線通常是 GND，仍需以實物確認",
          "馬達電流不經過 400 孔麵包板細導電軌"
        ]
      },
      {
        "title": "先測試單顆馬達",
        "body": "先讓馬達在小角度範圍移動，確認供電穩定與接線無誤，再擴大角度；若機構受阻就立即停止。",
        "points": [
          "先做 75° → 90° → 105° 小角度測試",
          "完整轉動行程需按實測限制",
          "兩顆馬達先分開測試，再安裝雙軸機構"
        ]
      },
      {
        "title": "使用 PWM 控制角度",
        "body": "PCA9685 會送出對應伺服脈波。下面是概念，不可直接拿這段不完整程式驅動實物，實機需先校準脈寬、供電及角度。",
        "codeTitle": "伺服控制邏輯（示意）",
        "code": "// 前提：PCA9685 初始化完成、獨立 5V 供電通過檢查\n// 設定水平伺服目標角度 = 90 度\n// 由實測校準角度轉換對應脈波\n// 一次只改變少量角度並檢查干涉",
        "points": [
          "獨立 5V/2A 是設計起點，並非保證兩顆馬達不卡電",
          "通電前用萬用電表確認極性"
        ]
      }
    ],
    "lab": {
      "type": "servo",
      "title": "雙軸角度模擬",
      "description": "拖動滑桿，理解左右與上下兩個自由度；只做畫面模擬，不會動實體馬達。",
      "action": "回正"
    },
    "challenge": "畫出兩顆伺服馬達的機械轉軸與行程限制。",
    "quiz": [
      {
        "q": "PCA9685 上的 V+ 主要給誰？",
        "options": [
          "ESP32 3.3V 邏輯",
          "SG90 馬達的電源",
          "LCD 背光"
        ],
        "answer": 1,
        "why": "V+ 是外部伺服供電輸入，與邏輯 VCC 功能不同。"
      },
      {
        "q": "兩顆 SG90 卡住時應怎麼辦？",
        "options": [
          "繼續加大角度",
          "停止動作、檢查機構及供電",
          "接到 3.3V 試試"
        ],
        "answer": 1,
        "why": "堵轉會產生高電流與升溫風險。"
      }
    ],
    "checks": [
      "確認實際接線與獨立供電",
      "單顆 SG90 可小角度移動",
      "第二顆 SG90 可小角度移動",
      "雙軸未發生機械干涉"
    ],
    "links": [
      [
        "PCA9685 官方教學（Adafruit）",
        "https://learn.adafruit.com/16-channel-pwm-servo-driver"
      ]
    ]
  },
  {
    "id": "10",
    "title": "AI 輔助 3D 外殼設計",
    "short": "8 個實作關卡：拍照 → AI 建模 → FreeCAD → ABS / P2S",
    "stage": "產品整合",
    "minutes": 420,
    "icon": "box",
    "level": "8 關卡完整實作",
    "goal": "你提供照片與卡尺量測，AI 建立可調參數的 FreeCAD 模型；再用公司 P2S 以 ABS 列印測試件、實測修正，最後完成可拆裝的寵物外殼。",
    "tools": [
      "你的 ESP32-S3-LCD-1.47B-M 照片與實物",
      "卡尺／尺＋Waveshare 原廠 3D Structure",
      "Mac FreeCAD 與 AI 聊天工具",
      "Bambu Studio + 公司 P2S / ABS",
      "3D 實作工作坊（有尺寸輸入和 Macro 產生器）"
    ],
    "status": "設計階段",
    "sections": [
      {
        "title": "10-A｜找原廠 3D 檔、拍六種照片",
        "body": "先到 Waveshare 官網找 ESP32-S3-LCD-1.47B 的 3D Structure，核對 31031 M 版本。拍正面、背面、左右側、USB 實際插線照、PCB 型號特寫，交給 AI 辨識。照片是參考，不可用來猜精密孔距。",
        "points": [
          "原廠 Resources → Hardware Resources → 3D Structure，優先下載原始 CAD",
          "照片和尺同框，鏡頭垂直於板面，USB 插線需要保留彎折空間",
          "完整教學及拍攝清單：3D 實作工作坊 10-A"
        ]
      },
      {
        "title": "10-B｜卡尺量測、統一座標、輸入參數",
        "body": "不用手畫工程圖；你只需量出 PCB 寬高、LCD 開孔左下角位置、寬高，再把 USB、PCB 孔中心和排針高度記在尺寸表。互動工作坊提供表單和 2D 開窗預覽。",
        "points": [
          "從 LCD 正面看，PCB 左下角為 (0,0)、X 向右、Y 向上、全用 mm",
          "不確定的值保持空白；不能把 95×80×80mm 概念外形當 PCB 尺寸",
          "先量主要六值，就能進入 AI 建模練習；其餘固定孔與 USB 精度要逐步補測"
        ]
      },
      {
        "title": "10-C｜把照片＋尺寸交給 AI 產生 CAD 方案",
        "body": "在 3D 工作坊按「複製完整 AI 建模提示詞」，到 ChatGPT／Claude 另外附上照片、原廠模型與量測值。請 AI 列出已確認、推測、缺少數據，再產生可重跑的 FreeCAD Python Macro。",
        "points": [
          "第一輪只做 LCD 開孔測試片，不要求一口氣產生整機精密外殼",
          "用自然語言修改尺寸：例如 USB 孔提高 2mm、壁厚 2.5mm",
          "網站只生成文字提示，不會自動將照片傳送到 AI 或連動 Blender／FreeCAD"
        ]
      },
      {
        "title": "10-D｜FreeCAD 直接執行 AI Macro，不必手動畫",
        "body": "從工作坊用已量測數值下載 .FCMacro，FreeCAD 的 Macro → Macros 執行；看到 3D 測試片後，保存 .FCStd，選單 File → Export 匯出 STL。範例程式尚未在你的 Mac 實機驗證，遇到錯誤要記錄訊息。",
        "points": [
          "參數集中在 Macro 頂端，修改數值後重新執行即可生成新版本",
          "只有 LCD 開孔，固定柱需已確認孔位才會生成，禁止由照片硬猜",
          "FreeCAD 只是模型檢查、腳本執行、工程檔與 STL 匯出的工具"
        ]
      },
      {
        "title": "10-E｜AI 設計前蓋、主體、後蓋和雙馬達支架",
        "body": "完成 LCD 試片後，再請 AI 逐步建立可拆裝的五個模組。檢查 LCD 不被壓、USB 和獨立 5V 電源孔在背面、SG90 轉軸不撞殼、線材有拉力保護。尚未買到的模組只能用待驗證的佔位盒表示。",
        "points": [
          "前蓋、主體、後蓋、頭頸雙軸支架、底座分件建模",
          "AI 外觀可在 Blender + MCP 優化，但精密孔位和裝配回 FreeCAD 驗證",
          "外殼約 95×80×80mm 是概念目標，實際放不下時應調整尺寸"
        ]
      },
      {
        "title": "10-F｜Bambu Studio ABS 切片與 P2S 試印",
        "body": "用 STL 匯入 Bambu Studio，選公司 P2S、實際噴嘴與 ABS 線材 Profile。確認列印方向、支撐、尺寸和預估耗材，再 Save Project 為 3MF。依公司授權與通風安全規範列印，先小件測試。",
        "points": [
          "ABS 品牌、噴嘴、底板和通風措施先確認；不要直接套 PLA Profile",
          "ABS 可能翹曲與排放微粒／VOC，機器密閉並不代表不需通風",
          "先印 LCD 固定片，再 USB 背面孔，之後才是馬達支架與完整殼體"
        ]
      },
      {
        "title": "10-G｜量誤差、複製提示詞叫 AI 修改",
        "body": "用卡尺記錄『設計值、實際值、差值』並拍下試裝結果。工作坊可以計算孔距偏差並生成 AI 修改提示詞。先判斷模型、切片、收縮、翹曲或量測問題，再改 1～2 個參數重新印。",
        "points": [
          "誤差＝實測－設計，不能拿單一數字當作所有 ABS 的固定收縮率",
          "每次保存 FreeCAD、STL、3MF 版本與重新試裝結果",
          "真正達到裝配要求後才標記驗收"
        ]
      },
      {
        "title": "10-H｜輸出正式工程資料包並完成裝配",
        "body": "保留 FreeCAD 原生 .FCStd、AI Macro、STEP、分件 STL、Bambu Studio 3MF、PDF 裝配圖與測試照片。確認所有電源孔在背面、結構可拆、SG90 不干涉、ABS 沒有重大翹曲，才能視為完成。",
        "points": [
          "不要把概念示意 STL 當正式可列印交付物",
          "大型模型與公司內部資料上傳前先檢查公開 GitHub 的保密要求",
          "進度可在互動工作坊分關卡勾選並匯出 JSON 備份"
        ]
      }
    ],
    "lab": {
      "type": "shell",
      "title": "尺寸與外殼比例模擬（入門）",
      "description": "此處僅示意外觀尺寸。要進行照片清單、實測尺寸表、2D 開窗預覽、AI 提示詞、FreeCAD Macro 下載與 ABS 試印記錄，請開啟下方連結的 3D 實作工作坊。",
      "action": "恢復概念尺寸"
    },
    "challenge": "開啟 3D 實作工作坊，先完成 10-A 主板拍照及原廠 3D 模型查找。主板到貨後填完 10-B 實測六個數字，再做 10-D FreeCAD LCD 開孔試片；用 ABS 在 P2S 試印後回傳實測誤差。",
    "quiz": [
      {
        "q": "有 Waveshare 官方 3D Structure 時，最有效率的第一步？",
        "options": [
          "直接丟掉原廠資料、靠照片猜尺寸",
          "下載並核對原廠 3D 結構是否符合 31031 M 版",
          "先印整個外殼"
        ],
        "answer": 1,
        "why": "優先使用可核對的原廠幾何資料，照片與卡尺用來辨識修訂版和驗證尺寸。"
      },
      {
        "q": "AI 看了 PCB 照片，但孔中心距不清楚，應怎麼做？",
        "options": [
          "請 AI 猜個值",
          "以原廠機構圖或實物卡尺量測，不確定就留待確認",
          "直接固定用 3mm"
        ],
        "answer": 1,
        "why": "精密配合尺寸必須有來源，不能把圖片估算當成工程驗證。"
      },
      {
        "q": "想改 USB-C 開孔高度，最適合的做法？",
        "options": [
          "修改 FreeCAD 參數，再檢查連接器與裝配",
          "直接放大 STL 不檢查其他孔",
          "只改 Blender 渲染顏色"
        ],
        "answer": 0,
        "why": "改動應由可編輯工程參數出發，並重新檢查干涉、保留新版模型。"
      },
      {
        "q": "公司 P2S 目前 ABS 的第一版試印應先做什麼？",
        "options": [
          "用 PLA Profile 直接列印完整外殼",
          "先確認材料 Profile／通風，列印小尺寸測試片",
          "直接修改公司機器的安全風扇 G-code"
        ],
        "answer": 1,
        "why": "ABS 排放與翹曲風險需要正確的材料設定及環境控制，先試印孔位可以減少浪費。"
      },
      {
        "q": "ABS 試印孔徑比設計小 0.4mm，是否全模型一律加 0.4mm？",
        "options": [
          "是，所有孔都加",
          "否，先排查量測、切片、收縮和翹曲，依證據改參數",
          "改成固定 100% 比例縮放"
        ],
        "answer": 1,
        "why": "單一尺寸誤差並不足以判斷所有幾何的補償值。"
      }
    ],
    "checks": [
      "10-A 已查原廠結構資料並拍攝正、背、側面和 USB 插線照片",
      "10-B 已量 PCB、LCD 與 USB 關鍵尺寸，未量測部分明確標示",
      "10-C AI 已列出確定／未知尺寸並提出可改參數的建模方案",
      "10-D 已在 FreeCAD 執行 Macro、調參數，保存可編輯 .FCStd",
      "10-E 已規劃可拆外殼與兩路背面電源孔、SG90 干涉條件",
      "10-F 以 P2S 正確 ABS Profile 完成小件列印並記錄安全條件",
      "10-G 已用實測誤差請 AI 回修參數，至少完成一次再列印驗證",
      "10-H 保存 .FCStd、STEP、分件 STL、3MF 與裝配驗收資料"
    ],
    "links": [
      [
        "★ 開啟 3D 外殼互動實作工作坊",
        "../3d-design/guide/index.html"
      ],
      [
        "10-A：照片與官方 3D 資源",
        "../3d-design/tutorials/01_照片蒐集與原廠模型.md"
      ],
      [
        "10-B：尺寸量測與座標",
        "../3d-design/tutorials/02_尺寸量測與座標.md"
      ],
      [
        "10-C：AI 建模提示詞",
        "../3d-design/tutorials/03_AI生成建模規格與提示詞.md"
      ],
      [
        "10-D：FreeCAD Macro 執行",
        "../3d-design/tutorials/04_FreeCAD執行與修正.md"
      ],
      [
        "10-E：機構裝配",
        "../3d-design/tutorials/05_外殼分件與裝配檢查.md"
      ],
      [
        "10-F：Bambu Studio / ABS",
        "../3d-design/tutorials/06_BambuStudio_ABS列印.md"
      ],
      [
        "10-G：ABS 試印回修",
        "../3d-design/tutorials/07_ABS試印回修循環.md"
      ],
      [
        "10-H：正式交付",
        "../3d-design/tutorials/08_版本管理與最終交付.md"
      ],
      [
        "FreeCAD 自動建模 Macro",
        "../3d-design/freecad/LCD_Window_Test.FCMacro"
      ]
    ]
  },
  {
    "id": "11",
    "title": "把 AI 寵物整合完成",
    "short": "狀態機、測試、記錄與展示",
    "stage": "產品整合",
    "minutes": 100,
    "icon": "rocket",
    "level": "整合挑戰",
    "goal": "整合表情、文字 LLM、音訊、轉頭與供電，形成可重複操作的桌上型寵物。",
    "tools": [
      "通過各單項驗證的電子模組",
      "外殼樣件",
      "完整專案原始碼"
    ],
    "status": "最終挑戰",
    "sections": [
      {
        "title": "建立清楚的狀態機",
        "body": "例如 IDLE、LISTENING、THINKING、SPEAKING、ERROR。每個狀態對應表情、音訊及動作，避免不同任務搶占同一資源。",
        "points": [
          "IDLE：保持眨眼與低頻更新",
          "THINKING：顯示等待，不重複提交付費請求",
          "ERROR：顯示明確的網路或電源問題"
        ]
      },
      {
        "title": "把錯誤當成產品設計",
        "body": "實機一定會遇到 Wi-Fi 斷線、API 逾時、字型缺字、音訊雜訊及馬達轉動干涉。先有錯誤回復策略，才算真正完成原型。",
        "points": [
          "斷網後能顯示離線而非卡住",
          "限制雲端模型呼叫次數與費用",
          "啟動時先回正伺服，避免直接碰撞"
        ]
      },
      {
        "title": "完整測試清單",
        "body": "每次修改硬體或程式都記錄版本、日期、結果與未解問題。最後可以錄一段 60 秒展示影片。",
        "codeTitle": "狀態機概念（示意）",
        "code": "enum PetState { IDLE, LISTENING, THINKING, SPEAKING, ERROR_STATE };\nPetState currentState = IDLE;\n\n// 接收到指令 → THINKING\n// API 回應成功 → 顯示文字 → SPEAKING / IDLE\n// API 超時或斷網 → ERROR_STATE",
        "points": [
          "此處為軟體設計稿，最終程式需整合各模組實測"
        ]
      }
    ],
    "lab": {
      "type": "integration",
      "title": "整機狀態模擬",
      "description": "切換不同事件，觀察 AI 寵物如何回應。此模擬不會控制真實硬體。",
      "action": "重置"
    },
    "challenge": "建立一個 60 秒展示腳本：開機、眨眼、提問、回答、點頭、斷網處理。",
    "quiz": [
      {
        "q": "LLM 網路逾時時，介面應該怎麼做？",
        "options": [
          "一直顯示 Thinking",
          "顯示錯誤並可重試",
          "立刻讓兩顆馬達全速運轉"
        ],
        "answer": 1,
        "why": "使用者需要知道狀態並有恢復操作。"
      },
      {
        "q": "最適合哪一項當作專案完成定義？",
        "options": [
          "所有功能只在簡報上能動",
          "每項功能實機測試可重現且有記錄",
          "已經買齊零件"
        ],
        "answer": 1,
        "why": "原型是否完成要以可重現的實機驗證為準。"
      }
    ],
    "checks": [
      "所有功能完成單項測試",
      "斷網與逾時能恢復",
      "雙馬達不干涉、供電穩定",
      "完成 60 秒展示與版本紀錄"
    ],
    "links": [
      [
        "完整學習路線 Markdown",
        "../docs/06_開發路線圖.md"
      ]
    ]
  }
];
