/**
 * 切绘制圆角矩形（处理后只能在切出区域内绘制）
 * @param ctx 画布
 * @param color 颜色
 * @param x 左上角x坐标
 * @param y 左上角y坐标
 * @param w 宽度
 * @param h 高度
 * @param r 圆角度数
 */
const drawRoundRect = (ctx, color, x, y, w, h, r) => {
    x = rpxTopx(x);
    y = rpxTopx(y);
    w = rpxTopx(w);
    h = rpxTopx(h);
    r = rpxTopx(r);

    // 开始绘制
    ctx.beginPath();
    ctx.setFillStyle(color);
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);

    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);

    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);

    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);

    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);

    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);

    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);

    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);

    ctx.setFillStyle(color);
    ctx.fill();

    ctx.clip();
    ctx.closePath();
};

/**
 * 切绘制矩形（处理后只能在切出区域内绘制）
 * @param ctx 画布
 * @param color 颜色
 * @param x 左上角x坐标
 * @param y 左上角y坐标
 * @param w 宽度
 * @param h 高度
 */
const drawRect = (ctx, color, x, y, w, h) => {
    x = rpxTopx(x);
    y = rpxTopx(y);
    w = rpxTopx(w);
    h = rpxTopx(h);
    ctx.setFillStyle(color);
    ctx.fillRect(x, y, w, h);
};

/**
 * 绘制圆形图片
 * @param ctx 画布
 * @param image 图片地址
 * @param x 圆心x
 * @param y 圆心y
 * @param r 半径
 */
const drawRoundImage = (ctx, image, x, y, r) => {
    x = rpxTopx(x);
    y = rpxTopx(y);
    r = rpxTopx(r);

    ctx.save();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.clip();//画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
    ctx.drawImage(image, x - r, y - r, 2 * r, 2 * r); // 推进去图片
    ctx.restore();
};

/**
 * 绘制图片
 * @param ctx 画布
 * @param img 图片路径
 * @param x 左上角x
 * @param y 左上角y
 * @param w 宽度
 * @param h 高度
 */
const drawImage = (ctx, img, x, y, w, h) => {
    x = rpxTopx(x);
    y = rpxTopx(y);
    w = rpxTopx(w);
    h = rpxTopx(h);
    ctx.drawImage(img, x, y, w, h); // 推进去图片
};

/**
 * 保存分享图片到相册
 * @param that 上下文环境
 * @param cName 画布id
 * @param isTry 是否在保存失败后重试
 */
const save2Memory = (that, cName, isTry = true) => {
    return new Promise((resolve, reject) => {
        const wxCanvasToTempFilePath = wxPromisify(wx.canvasToTempFilePath);
        wxCanvasToTempFilePath({
            canvasId: cName
        }, that).then(res => {
            // return res.tempFilePath
            resolve(res.tempFilePath);
        }).catch(res => {
            if (isTry) {
                //绘制失败重试机制
                that.saveShareCard(that, cName, false);
            } else {
                reject();
            }
        });
    });
};

/**
 * 保存图片到相册
 * @param path 图片缓存位置
 */
const save2PhotoAlbum = (path) => {
    const wxSaveImageToPhotosAlbum = wxPromisify(wx.saveImageToPhotosAlbum);
    wxSaveImageToPhotosAlbum({
        filePath: path
    }).then(res => {
        wx.hideLoading();
    })
};

/**
 * @param ctx 画布
 * @param text 待绘制文案
 * @param fontSize 字符大小
 * @param fontColor 字符颜色
 * @param x 左上角x坐标
 * @param y 左上角y坐标
 * @param bold 是否加粗
 */
const drawText = (ctx, text, fontSize, fontColor, x, y, bold = false) => {
    fontSize = rpxTopx(fontSize);
    x = rpxTopx(x);
    y = rpxTopx(y);

    ctx.save();
    if (bold) {
        ctx.font = "normal bold 14px arial";
    }
    ctx.setTextAlign('left');
    ctx.setFillStyle(fontColor);
    ctx.setFontSize(fontSize);
    ctx.fillText(text + "", x, y);
    let textWidth = 0;
    textWidth = ctx.measureText(text + "").width;
    textWidth = pxTorpx(textWidth);
    ctx.restore();
    return textWidth;
};

/**
 * 绘制长文本
 * @param ctx 画布
 * @param text 待绘制文案
 * @param fontSize 字符大小
 * @param fontColor 字符颜色
 * @param x 左上角x坐标
 * @param y 左上角y坐标
 * @param lineHeight 行高
 * @param lineLong 单上长度
 * @param lineNumber 行数
 */
const drawLongText = (ctx, text, fontSize, fontColor, x, y, lineHeight, lineLong, lineNumber, bold = false) => {
    ctx.save();
    if (bold) {
        ctx.font = "normal bold 14px arial";
    }
    ctx.setFillStyle(fontColor);
    ctx.setFontSize(rpxTopx(fontSize));
    let chr = text.split("");//这个方法是将一个字符串分割成字符串数组
    let temp = "";
    let row = [];
    for (let a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < rpxTopx(lineLong)) {
            temp += chr[a];
        } else {
            a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
            row.push(temp);
            temp = "";
        }
    }
    row.push(temp);

    //如果数组长度大于lineNumber
    if (row.length > lineNumber) {
        let rowCut = row.slice(0, lineNumber);
        let rowPart = rowCut[lineNumber - 1];
        let test = "";
        let empty = [];
        for (let a = 0; a < rowPart.length; a++) {
            if (ctx.measureText(test).width < rpxTopx(lineLong - 40)) {
                test += rowPart[a];
            } else {
                break;
            }
        }
        empty.push(test);
        let group = empty[0] + "..."; //这里只显示两行，超出的用...表示
        rowCut.splice(lineNumber - 1, 1, group);
        row = rowCut;
    }
    for (let b = 0; b < row.length; b++) {
        ctx.fillText(row[b], rpxTopx(x), rpxTopx(y) + b * rpxTopx(lineHeight), rpxTopx(lineLong));
    }
    ctx.restore();
};

/**
 * 绘制直线
 * @param ctx 画布
 * @param startX 起点x值
 * @param startY 起点y值
 * @param endX 终点x值
 * @param endY 终点y值
 * @param lineWidth 线宽
 * @param color 线颜色
 */
const drawLine = (ctx, startX, startY, endX, endY, lineWidth, color) => {
    startX = rpxTopx(startX);
    startY = rpxTopx(startY);
    endX = rpxTopx(endX);
    endY = rpxTopx(endY);
    lineWidth = rpxTopx(lineWidth);
    ctx.save();
    ctx.beginPath(); //开始一个新的路径
    ctx.setStrokeStyle(color);
    ctx.setLineWidth(lineWidth);
    ctx.moveTo(startX, startY); //路径的起点
    ctx.lineTo(endX, endY); //路径的终点
    ctx.stroke(); //对当前路径进行描边
    ctx.closePath(); //关闭当前路径
    ctx.restore();
};

/**
 * 获取渐变色
 * @param ctx 画布
 * @param x 起点x
 * @param y 起点y
 * @param w 宽度
 * @param h 高度
 * @param sColor 起点色
 * @param eColor 终点色
 * @return {void | CanvasGradient} 渐变色
 */
const createLinearGradient = (ctx, x, y, w, h, sColor, eColor) => {
    x = rpxTopx(x);
    y = rpxTopx(y);
    w = rpxTopx(w);
    h = rpxTopx(h);
    const grd = ctx.createLinearGradient(x, y, x + w, y + h);
    grd.addColorStop(0, sColor);
    grd.addColorStop(1, eColor);
    return grd;
};

/**
 * wxPromisify
 * @fn 传入的函数，如wx.request、wx.download
 */
const wxPromisify = (fn) => {
    return function (obj = {
        quality: 1,
    }) {
        return new Promise((resolve, reject) => {
            obj.success = function (res) {
                resolve(res)
            };

            obj.fail = function (res) {
                reject(res)
            };
            fn(obj) //执行函数，obj为传入函数的参数
        })
    }
};

/**
 * 测量文案长度
 * @param ctx 画布
 * @param text 文案
 * @param size 文案字号
 * @return {*|number} 文案长度（单位rpx）
 */
const measureText = (ctx, text, size) => {
    ctx.save();
    ctx.setFontSize(rpxTopx(size));
    let textWidth = ctx.measureText(text + "").width;
    textWidth = pxTorpx(textWidth);
    ctx.restore();
    return textWidth;
};

/**
 * rpx转换px
 */
const rpxTopx = (rpx) => {
    return wx.getSystemInfoSync().windowWidth / 750 * rpx;
};

/**
 * px转换rpx
 */
const pxTorpx = (px) => {
    return 750 / wx.getSystemInfoSync().windowWidth * px;
};

module.exports = {
    drawRect,
    drawRoundRect,
    drawImage,
    drawLongText,
    drawText,
    drawLine,
    drawRoundImage,
    save2Memory,
    save2PhotoAlbum,
    rpxTopx,
    pxTorpx,
    measureText,
    createLinearGradient
};