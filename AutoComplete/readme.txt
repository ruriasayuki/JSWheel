AutoComplete 封装说明
var AutoComplete = function(domid,url,clickFunc,appendData,idLabel,nameLabel) {}

最简单使用方法
引用对应css和js后

var testAuto = new AutoComplete(要绑定的输入框名字,要请求的URL路径,点击后发生的函数（可缺省，默认为赋值给绑定的输入框）,接口需要的附加约束信息,请求返回的数据绑定到下拉框ID上的字段名,请求返回的数据绑定到Label上的字段列表（逗号分隔）)

然后关于appendDate 要求传入的是一个字符串数组
字符串数组的开头如果是#或者. 会去获取对应dom里面的value

后台写法（C#示例）
public JsonResult getInfoList（随便起个名啊）(string keywords, string appendData){
    关键是请求的参数必须叫做keywords和appendData appendData会按照传入顺序由逗号分隔

    返回值如下
    result = Json(new
                    {
                        code = true,
                        data = list
                    });
                }
    code为是否成功代码
    data主要由list转化而来

    data的list可以由以下代码获取
    var list = Rbll.GetModelList(whereStr + "and Hospital_Num ='"+ hosNum + "'").Take(10);
    返回前台的是由对应的List<ClassName>封装而成的对象
}