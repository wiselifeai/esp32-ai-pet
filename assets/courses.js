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
    "title": "設計 3D 寵物外殼",
    "short": "FreeCAD 建模、ABS 材料、Bambu Studio、P2S 實作",
    "stage": "產品整合",
    "minutes": 95,
    "icon": "box",
    "level": "設計實作",
    "goal": "以公司現有 ABS 材料在 Bambu Lab P2S 列印 LCD 與 PCB 固定座測試件，檢查翹曲、孔位精度，再開發背面電源孔的完整外殼。",
    "tools": [
      "FreeCAD（工程主模型）",
      "Bambu Studio（P2S + ABS 材料 Profile）",
      "公司 Bambu Lab P2S（實際噴嘴／底板待確認）",
      "公司 ABS 線材（品牌／型號待確認）",
      "Blender + Blender MCP（外觀選用）",
      "尺或卡尺"
    ],
    "status": "設計階段",
    "sections": [
      {
        "title": "確認 ABS 材料與公司 P2S 安全條件",
        "body": "公司 P2S 已有 ABS 線材，不必另外購買 PLA。ABS 常用於耐熱與機構外殼，但相較 PLA 更可能收縮翹曲，列印時也可能產生超細顆粒與揮發性有機化學物質。先依公司規範確認操作許可與適當通風／局部排氣；機器的門蓋與濾網不是免通風保證。",
        "points": [
          "確認 ABS 線材品牌、系列、儲存狀態與是否需要乾燥",
          "確認 P2S 實際噴嘴、底板，以及公司安全與通風規範",
          "不要擅自修改公司機器 G-code／風扇／安全設備",
          "先量測主板再建立模型，不把概念尺寸當已完成的工程圖"
        ]
      },
      {
        "title": "FreeCAD：先設計可量測的尺寸測試件",
        "body": "以 Waveshare ESP32-S3-LCD-1.47B-M 的實體 PCB、LCD 可視區、USB-C 插入空間、固定孔距為準，建立試片。整機目標約 95×80×80mm，但螺絲孔、固定柱及卡扣必須按 ABS 實際列印結果修正。",
        "points": [
          "第一片：LCD 開孔＋PCB 固定柱試片",
          "第二片：背面 USB-C 和獨立 5V 電源開口",
          "第三片：後續 SG90 兩軸支架的干涉試件",
          "外殼要可拆卸維修，前面不設電源孔"
        ]
      },
      {
        "title": "Bambu Studio：選 ABS，再列印與驗收",
        "body": "將 STL（mm）匯入 Bambu Studio，選公司 P2S 與相符 ABS 耗材 Profile。若線材是 Bambu 原廠 ABS，其參考噴嘴溫度 240–270°C、熱床 80–100°C；若是其他品牌，以公司已驗證或該品牌的 Profile 為準，不直接套數值。",
        "points": [
          "標配 0.4mm 噴嘴可先考慮與 ABS 相容的 0.20mm 層高預設",
          "視切片結果調整 Brim、附著和支撐，並注意溫差造成的翹曲",
          "冷卻後量測開孔、螺絲柱與 PCB 實際裝配，紀錄 ABS 收縮與偏差",
          "保存 .FCStd、STEP、分件 STL 與 Bambu Studio 3MF，版本記錄放 GitHub"
        ]
      }
    ],
    "lab": {
      "type": "shell",
      "title": "機身尺寸配置器",
      "description": "調整示意尺寸，觀察設計比例與背部供電位置。這不是可列印 STL。",
      "action": "恢復建議尺寸"
    },
    "challenge": "先確認公司 ABS 品牌與 P2S 的安全通風條件。收到主板後用 FreeCAD 畫出 LCD 開孔＋固定柱試片，用 Bambu Studio ABS Profile 切片，再實際列印並測量孔距誤差。",
    "quiz": [
      {
        "q": "公司目前使用 ABS，Bambu Studio 應優先選哪種設定？",
        "options": [
          "PLA 預設",
          "與公司 ABS 品牌／系列匹配的 Profile",
          "任何材料都使用同樣溫度"
        ],
        "answer": 1,
        "why": "不同 ABS 品牌與系列的溫度、冷卻需求可能不同，應以相符的官方或公司驗證 Profile 為準。"
      },
      {
        "q": "為什麼 ABS 外殼應先列印小型孔位測試件？",
        "options": [
          "因為 ABS 可能收縮與翹曲，需實測公差",
          "因為不能列印大型外殼",
          "因為 USB-C 一定要放在正面"
        ],
        "answer": 0,
        "why": "先量測實體尺寸偏差，才能修正 PCB 固定柱、螺絲孔、USB 開口與卡扣。"
      }
    ],
    "checks": [
      "確認公司 ABS 品牌／型號、P2S 噴嘴與安全通風／操作許可",
      "量測 ESP32 PCB、LCD、USB-C 插入空間並記錄尺寸",
      "FreeCAD 完成 LCD／PCB 固定柱試片，使用 Bambu Studio ABS Profile 切片",
      "於公司 P2S 完成 ABS 試印，量測翹曲、孔位尺寸與實際裝配"
    ],
    "links": [
      [
        "ABS 材料設定、公差與安全",
        "../3d-design/printing/ABS-material-guide.md"
      ],
      [
        "P2S 列印流程",
        "../3d-design/printing/P2S-print-workflow.md"
      ],
      [
        "主板尺寸量測表",
        "../3d-design/specs/measurements.md"
      ],
      [
        "NIOSH 3D 列印排放與通風",
        "https://www.cdc.gov/niosh/bulletin/2018/3d-printing.html"
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
