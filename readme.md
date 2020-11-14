# iPhone12のスクショを切り欠き付きで保存したい

以下のURLからどうぞ

https://yfujii01.github.io/make_iphone_screenshot/

ファイル選択後、表示される画像を右クリックから保存してください。

## 設計

![図1](img/2020-11-14-17-04-01.png)

|No|x位置|y位置|
|---|---|---|
|①|x + r|y|
|②|x + w - r|y|
|③|x + w|y + r|
|④|x + w|y + h - r|
|⑤|x + w - r|y + h|
|⑥|x + r|y + h|
|⑦|x|y + h - r|
|⑧|x|y + r|

![図2](img/2020-11-14-16-59-08.png)
