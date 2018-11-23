# EasyCanvas
小程序canvas辅助库

# 介绍
小程序canvas辅助工具，简化绘制过程，兼容Android、IOS双平台，让你的绘制过程优雅起来，欢迎大家使用和讨论。邮箱jialongkou@163.com

# 使用方法
const easyCanvas = require('easyCanvas/easyCanvas.js');

# API
1 绘制圆角矩形（处理后只能在切出区域内绘制）
* @param ctx 画布
* @param color 颜色
* @param x 左上角x坐标
* @param y 左上角y坐标
* @param w 宽度
* @param h 高度
* @param r 圆角度数
* drawRoundRect(ctx, color, x, y, w, h, r)


 2 绘制矩形（处理后只能在切出区域内绘制）
 * @param ctx 画布
 * @param color 颜色
 * @param x 左上角x坐标
 * @param y 左上角y坐标
 * @param w 宽度
 * @param h 高度
 * drawRect(ctx, color, x, y, w, h)

 3 绘制圆形图片
 * @param ctx 画布
 * @param image 图片地址
 * @param x 圆心x
 * @param y 圆心y
 * @param r 半径
 * @param borderW 圆外框留白（默认不留白）
 * drawRoundImage(ctx, image, x, y, r)
 
 4 绘制图片
 * @param ctx 画布
 * @param img 图片路径
 * @param x 左上角x
 * @param y 左上角y
 * @param w 宽度
 * @param h 高度
 * drawImage(ctx, img, x, y, w, h)
 
 5 绘制文本
 * @param ctx 画布
 * @param text 待绘制文案
 * @param fontSize 字符大小
 * @param fontColor 字符颜色
 * @param x 左上角x坐标
 * @param y 左上角y坐标
 * @param bold 是否加粗
 * drawText(ctx, text, fontSize, fontColor, x, y, bold = false)

 6 绘制长文本
 * @param ctx 画布
 * @param text 待绘制文案
 * @param fontSize 字符大小
 * @param fontColor 字符颜色
 * @param x 左上角x坐标
 * @param y 左上角y坐标
 * @param lineHeight 行高
 * @param lineLong 单行长度
 * @param lineNumber 行数
 * drawLongText(ctx, text, fontSize, fontColor, x, y, lineHeight, lineLong, lineNumber, bold = false)
 

 7 绘制直线
 * @param ctx 画布
 * @param startX 起点x值
 * @param startY 起点y值
 * @param endX 终点x值
 * @param endY 终点y值
 * @param lineWidth 线宽
 * @param color 线颜色
 * drawLine(ctx, startX, startY, endX, endY, lineWidth, color)
 
 8 获取渐变色
 * @param ctx 画布
 * @param x 起点x
 * @param y 起点y
 * @param w 宽度
 * @param h 高度
 * @param sColor 起点色
 * @param eColor 终点色
 * @return {void | CanvasGradient} 渐变色
 * createLinearGradient(ctx, x, y, w, h, sColor, eColor)
 
 9 测量文案长度
 * @param ctx 画布
 * @param text 文案
 * @param size 文案字号
 * @return {*|number} 文案长度（单位rpx）
 * measureText(ctx, text, size)
 

 10 rpx转换px
 * rpxTopx(rpx)
 
 11 px转换rpx
 * pxTorpx(px)
 
 12 保存图片到缓存
 * @param that 上下文环境
 * @param cName 画布id
 * @param isTry 是否在保存失败后重试
 * save2Memory(that, cName, isTry = true)
 
 13 保存图片到相册
 * @param path 图片缓存位置
 * save2PhotoAlbum(path)

  14 下载图片
  * @param path 网络图片地址
  * @return {Promise<any>} 图片本地地址
  * downImage (path)
