var AutoIndex = function (domid, start) {
    var _start = start || 1;
    var indexList = $('#' + domid).find('input,select');
    var indexLen = indexList.length;
    var nowIndex = _start;
    for (var i = 0; i < indexLen; i++) {
        if ($(indexList[i]).attr('type') == 'hidden' || $(indexList[i]).hasClass('layui-unselect')) continue;
        $(indexList[i]).attr('tabIndex', nowIndex);
        nowIndex++;
    }
}
var reRendeSelect = function () {
    var selectCount = $('select').length;
    for (var i = 0; i < selectCount; i++) {
        var nowSelect = $('select')[i];
        var tabIndex = $(nowSelect).attr('tabIndex');
        var nowSelectP = $(nowSelect).parent();
        var sInput = $(nowSelectP).find('input');
        $(sInput).attr('tabIndex', tabIndex);
    }
    var checkboxCount = $('[type="checkbox"]').length;
    for (var i = 0; i < checkboxCount; i++) {
        var nowCheck = $('[type="checkbox"]')[i];
        var tabIndex = $(nowCheck).attr('tabIndex');
        var nowCheckP = $(nowCheck).parent();
        var sInput = $(nowCheckP).find('.layui-form-checkbox');
        $(sInput).attr('tabIndex', tabIndex);
    }
}
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1;//不是ie浏览器
    }
}
var dateTimeFlag = false;
var selectFlag = false;
$(document).keyup(function (event) {
    if (event.keyCode === 9) {
        if (dateTimeFlag) {
            $('.laydate-btns-confirm').click();
        }
        if (selectFlag) {
            var nextIndex = parseInt(lastIndex) + 1;
            var jsSelected = $('[tabindex=' + nextIndex + ']');
            var jqselectLen = jsSelected.length;
            if (jqselectLen != 0) {
                jsSelected[jqselectLen - 1].focus();
                if (jqselectLen > 1 && IEVersion() != -1) {
                    if ($(jsSelected[jqselectLen - 1]).hasClass('layui-input'))
                        jsSelected[jqselectLen - 1].click();
                }
            }
            selectFlag = false;
        }
        var nowDom = $(':focus');
        if ($(nowDom).hasClass("layui-unselect")) {
            lastIndex = $(nowDom).attr("tabIndex");
            selectFlag = true;
        }

        if ($(nowDom).attr('lay-verify') == 'datetime') {
            dateTimeFlag = true;
        }
        else {
            dateTimeFlag = false;
        }
        return;
    }
    if (event.keyCode === 13) {
        var nowDom = $(':focus');
        if ($(nowDom).hasClass("layui-form-checkbox")) {
            $(nowDom).click();
        }
    }

})