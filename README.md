# 2025-AdvancedGroup-MidTeamDev-No2

## アプリ概要

本アプリは、react(gatsby)およびsupabase edge functionsを使って作成した龍谷大学のサークル一覧を閲覧できるアプリ。サークルごとに管理者にアカウントを配り、紹介ページをサークルの管理者がそれぞれいつでも編集できる。公認サークルでも非公認サークルでも申請があればサークル紹介ページを作成できる。サークルのカテゴリ別整理や、検索システムやAIによる「あなたに合っているサークル診断」などを実装する。主に新入生向けに自分の探しているサークルや、自分に合ったサークルを探すことができるサービス。

## 使用技術

 - supabase cli 2.12.1
 - gatsby 5.14.1
 - react 18.2.0

## 主な機能

 - サークル紹介一覧表示
 - サークル検索
 - サークル紹介掲載申請
 - 申請時にサイト管理者にディスコードでお知らせ
 - メール送信機能（申請に対して、承認or拒否）
 - 

## ディレクトリ構成
```
/
├── frontend/ - フロントエンド
|   ├── src/
|   |   ├── components/ - コンポーネント
|   |   ├── constants/ - 定数
|   |   ├── hooks/ - カスタムフック     
|   |   ├── libs/
|   |   ├── pages/
|   |   |   ├── index.tsx - ホームページ
|   |   |   ├── search.tsx - 検索ページ
|   |   |   ├── login.tsx - ログインページ
|   |   |   ├── request.tsx - 申請ページ
|   |   |   ├── comp.tsx - 申請完了ページ
|   |   |   ├── fqa.tsx - よくある質問ページ
|   |   |   ├── 404.js - 404エラーページ
|   |   |   └── admin/
|   |   |       └── index.tsx - adminページ
|   |   ├── styles/
|   |   |   └── global/ 
|   |   └──types/
|   |       └── Circle.ts
|   ├── dockerfile
|   └── package.json
├── backend/ - バックエンド
|   └── supabase/
|       ├── functions/
|       |   ├── approve/
|       |   |   └── index.ts - 申請承認api
|       |   ├── auth_circle/ 
|       |   |   └── index.ts - ログインapi
|       |   ├── deny_request/
|       |   |   └── index.ts - 申請拒否api
|       |   ├── edit_circle/
|       |   |   └── index.ts - circleデータ編集api
|       |   ├── get_circle/
|       |   |   └── index.ts - circleデータ取得api
|       |   ├── get_pending/
|       |   |   └── index.ts - pendingデータ取得api
|       |   └──  insert_pending/
|       |       └── index.ts - pendingデータ挿入api
|       └── deno.json
├── docs/
└── docker-compose.yml
```