# HShare
## 使用nodejs express模块构建的文件资源共享网盘系统
## HShare简介
#### HShare是我在学校因疫情封校不能外出实习而个人独立开发的项目
#### HShare是由nodejs express框架构建的轻量化文件资源共享系统
#### 功能简介：实现登录注册功能，对登录的账号密码进行rsa加密进行服务端验证，文件的上传下载共享删除举报功能。适用人群：有文件共享存储需求的公司小群组和学校班级群组。
## 部署到服务器(以centos7为例)
### 1 克隆仓库
`git clone ""`
### 2 安装nodejs和npm
`yum install nodejs;`
`yum install npm;`
### 3 安装并部署mysql
安装mysql并导入HBIN.sql
### 4 修改配置文件
根据服务器情况修改util/mysql.js数据库连接,public/common里remoteUrl参数
### 5 启动项目
进入项目目录`npm   start`启动项目（前台运行）</br>
后台退出终端时运行`nohup npm start &`</br>
退出终端（不可直接关闭终端软件） `exit`
