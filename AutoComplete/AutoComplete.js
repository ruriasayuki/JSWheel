var AutoComplete = function(domid,url,clickFunc,appendData,idLabel,nameLabel)
{
    var _domid = domid;
    var _url = url;
    var _clickFunc = clickFunc || function () {
        _this = $('.click_work:hover').length == 0 ? $('.click_work.auto_onmouseover') : $('.click_work:hover');
        var word = $(_this).text();
        $('#'+domid).val(word);
        $('.word').hide();
    };

    var _appendData = appendData;
    var _parent = $('#'+domid).parent();
    $(_parent).append('<div id="'+domid+'word" class="word"></div>');
    var _wordDOM = domid+'word';
    var _cache = []
    var _idLabel = idLabel;
    var _nameLabel = nameLabel;
    var _index = -1;
    var _changeClassname = function (length) {
        for (var i = 0; i < length; i++) {
            if (i != _index) {
                var childDOM = $('#' + _wordDOM).children()[i];
                $(childDOM).removeClass('auto_onmouseover');
                $(childDOM).addClass('auto_onmouseout');
            } else {
                var childDOM = $('#' + _wordDOM).children()[i];
                $(childDOM).removeClass('auto_onmouseout');
                $(childDOM).addClass('auto_onmouseover');
            }
        }
    }
    $('#' + _domid).keyup(function (event) {
        var length = _cache.length;
        if (event.keyCode == 40) {
            ++_index;
            if (_index > length) {
                _index = 0;
            } 
            _changeClassname(length);
            return;
        }
            //光标键"↑"  
        else if (event.keyCode == 38) {
            _index--;
            if (_index < -1) {
                _index = length - 1;
            }
            _changeClassname(length);
            return;
        }
            //回车键  
        else if (event.keyCode == 13) {
            _clickFunc();
            return;
        }
        _index = -1;
        var keywords = $(this).val();
        if (keywords == '') { $('#word').hide(); return };
        var appendlen = _appendData.length;
        var trueAppend = ""
        for (var i = 0; i < appendlen; i++)
        {
            var ad = _appendData[i];
            if (ad[0] == '#'||ad[0]=='.')
            {
                ad = $(ad).val();
            }
            trueAppend +=ad;
        }
        $.ajax({
            url: _url,
            dataType: 'json',
            type: 'POST',
            data: {
                keywords: keywords,
                apendData: trueAppend
            },
            beforeSend:function(){
                $('#'+_wordDOM).append('<div>正在加载。。。</div>');
            },
            success: function (data) {
                $('#' + _wordDOM).empty().show();
                var code = data.code;
                _cache = [];
                if (code == false)
                {
                    list = '';
                    console.log(data.msg);
                    $('#' + _wordDOM).append('<div class="error">Not find  "' + keywords + '"</div>'); 
                    return;
                }
                var list = data.data;
                if (list == '')
                {
                    $('#'+_wordDOM).append('<div class="error">Not find  "' + keywords + '"</div>');
                }
                $.each(list, function () {
                    var nameLabels = _nameLabel.split(',');
                    var display = "";
                    for (var k = 0, length = nameLabels.length; k < length; k++) {
                        display = display + this[nameLabels[k]]+';';
                    }
                    $('#' + _wordDOM).append('<div class="click_work" id="' + this[_idLabel] + '">' + display + '</div>');
                    _cache.push(this);
                }) 
            },
            error:function(){
                $('#'+_wordDOM).empty().show();
                $('#' + _wordDOM).append('<div class="error">Fail "' + keywords + '"</div>');
            }
        })
    })
//点击搜索数据复制给搜索框
    $('#'+_wordDOM).on('click','.click_work',_clickFunc)
}
AutoComplete.prototype.getCacheByID = function (id)
{
    var cache = this._cache;
    var len = cache.length;
    for(var i=0;i<len;i++)
    {
        if(cache[i].id == id)
        {
            return cache[i];
        }
    }
    return null;
}