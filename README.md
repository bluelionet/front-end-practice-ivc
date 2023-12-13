# front-end-practice-ivc

## 簡介

此專案以 **React** 搭配 **Next.js API Route** 實作一個「保戶介紹關係系統」。

你可以：

- **輸入「保戶編號」並按「查詢」** 以查詢該保戶編號的介紹關係圖。
- **點擊主節點旁的「上一階」** 以查詢上一階保戶的介紹關係圖。
- **點擊子節點內的「保戶編號」** 以查詢該保戶編號的介紹關係圖。
- **滑鼠懸停在任一節點上** 以檢視更多資訊，例如：加入日、介紹人保戶編號等。
- **觀察所有節點的位置是否符合文件內描述之二元樹生長規則。** 備註：越晚加入的節點，其保戶編號越大。
- **用瀏覽器開發人員工具查看 API request 是否符合文件內描述之 API 規格。**

## 實機展示

https://front-end-practice-ivc.vercel.app/

## 本地安裝

1. `git clone` 此專案到本地端。
1. 執行 `npm install` 指令以安裝 package。
1. 執行 `npm run dev` 指令以跑起開發環境。
1. 開啟瀏覽器，於網址列輸入 `http://localhost:3000` 並前往，稍待片刻後即可看到展示畫面。

## 程式碼簡介

- `/src/pages/api/policyholders/[[...slug]].js`: 用來產生「保戶查詢」和「保戶上層查詢」mock API 的 API route 檔。
- `/src/pages/index.js`: 頁面元件。
- `/src/components/PolicyholderSearcher.js`: 保戶關係查詢元件。
- `/src/components/NodeBlock.js`: 節點元件。
- `/src/styles/globals.css`: CSS 檔。

## 備註

- 為求實機展示及本地安裝方便，此練習透過 Next.js API Route 直接以程式碼實作 mock API，而非使用 mock API 應用程式（例如：Mockoon）實作 mock API。
- 因撰寫時間有限，「保戶查詢」和「保戶上層查詢」mock API 目前一率只回傳四階全滿的假資料，以方便排版。
- 目前假資料中自動產生的保戶編號範圍為 1 ~ 9999，若查詢超過此範圍的保戶編號，mock API 回傳的假資料可能會不合邏輯。
