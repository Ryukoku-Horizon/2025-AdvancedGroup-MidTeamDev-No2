# API仕様

### エンドポイント

- POST `/functions/v1/auth_circle`

### 概要

ログイン処理を行う

### レスポンス

成功時

```json
{
  success:true,
  token: {jwtトークン}
}
```

失敗時（例）

```json
{
	success:false,
	error:"パスワードが無効です"
}
```

### エンドポイント

- POST `/functions/v1/approve`

### 概要

申請を承認する

申請者にメールを送る

### レスポンス

成功時

```json
{
  success:true
}
```

失敗時（例）

```json
{
	success:false,
	error:"メールの送信に失敗しました"
}
```

### エンドポイント

- POST `/functions/v1/deny_request`

### 概要

申請を拒否する

申請者にメールを送る

### レスポンス

成功時

```json
{
  success:true
}
```

失敗時（例）

```json
{
	success:false,
	error:"メールの送信に失敗しました"
}
```

### エンドポイント

- POST `/functions/v1/get_pending`

### 概要

Pendingテーブルからデータを取得する

### リクエスト

- match（条件）
    - 例：{”id”:1}（idが1のレコード取得）
- select（取得するフィールド）
    - 例：{”name”}（nameフィールドを取得）

### レスポンス

成功時

```json
{
  success:true,
  data:{pendingデータ}
}
```

失敗時（例）

```json
{
	success:false,
	error:"フィールドが存在しません"
}
```

### エンドポイント

- POST `/functions/v1/insert_pending`

### 概要

Pendingテーブルにデータを挿入する

Discordにメッセージを送る

### リクエスト

- pendingData（{id,name,email,activeDate,detail,location}）

### レスポンス

成功時

```json
{
  success:true
}
```

失敗時（例）

```json
{
	success:false,
	error:"nameフィールドがありません"
}
```

### エンドポイント

- POST `/functions/v1/get_circle`

### 概要

Circleテーブルからデータを取得する

### リクエスト

- match（条件）
    - 例：{”id”:1}（idが1のレコード取得）
- select（取得するフィールド）
    - 例：{”name”}（nameフィールドを取得）

### レスポンス

成功時

```json
{
  success:true,
  data:{circleデータ}
}
```

失敗時（例）

```json
{
	success:false,
	error:"条件（match）が無効です"
}
```

### エンドポイント

- POST `/functions/v1/edit_circle`

### 概要

Circleテーブルのデータを編集する

### リクエスト

- pendingData（{id,name,email,activeDate,detail,location}）

### レスポンス

成功時

```json
{
  success:true
}
```

失敗時（例）

```json
{
	success:false,
	error:"条件（match）が無効です"
}
```