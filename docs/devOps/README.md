# 前端部署
## jenkins
### centos7 安装jenkins
```bash
# 
wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import http://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install jenkins
```
### 启动jenkins
```bash
 systemctl start jenkins.service
```
### jenkins可以干什么
- 一键打包前端项目, 和gitlab项目连接, 只要输入项目git分支即可实现在线打包和部署
- 可以连接钉钉, 将部署的成功失败的状态通过钉钉消息通知开发人员
- 自定义shell脚本 执行shell命令
## 本地.sh脚本打包