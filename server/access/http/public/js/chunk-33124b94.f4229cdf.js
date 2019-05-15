(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33124b94"],{"0404":function(e,t,s){},"269b":function(e,t,s){},3519:function(e,t,s){"use strict";var a=s("5008"),c=s.n(a);c.a},3522:function(e,t,s){"use strict";var a=s("269b"),c=s.n(a);c.a},"3d70":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("Card",{staticClass:"device",attrs:{bordered:!1}},[s("dev-info"),s("dev-control")],1)],1)},c=[],l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"device-control"},[s("Row",[s("Col",{attrs:{span:"8"}},[s("Poptip",{staticStyle:{"text-align":"left"},attrs:{confirm:"",title:"是否确定修改信息?"},on:{"on-ok":e.toAdd}},[s("Button",{attrs:{type:"success",ghost:"",icon:"md-add"}},[e._v("添加设备")])],1)],1),s("Col",{attrs:{span:"8"}},[s("Poptip",{staticStyle:{"text-align":"left"},attrs:{confirm:"",title:"是否确定修改信息?"},on:{"on-ok":e.toUpdate}},[s("Button",{attrs:{type:"warning",ghost:"",icon:"ios-create"}},[e._v("修改参数")])],1)],1),s("Col",{attrs:{span:"8"}},[s("Poptip",{staticStyle:{"text-align":"left"},attrs:{confirm:"",title:"是否确定删除此设备?"},on:{"on-ok":e.toDelete}},[s("Button",{attrs:{type:"error",ghost:"",icon:"md-trash"}},[e._v("删除设备")])],1)],1)],1),e.loading?s("Spin",{attrs:{size:"large",fix:""}}):e._e()],1)},n=[],i=(s("7f7f"),s("cebc")),o=s("4653"),r=s("2f62"),d={data:function(){return{loading:!1}},computed:Object(r["c"])({selected:"selected"}),methods:Object(i["a"])({},Object(r["b"])(["listAdd","listDelete","listUpdate"]),{toAdd:function(){var e=this;this.selected.id&&this.selected.name&&this.selected.section&&this.selected.setup?(this.loading=!0,o["a"].service("device").create(this.selected).then(function(){e.loading=!1,e.listAdd(e.selected),e.$Message.success({content:"添加设备成功",duration:3,closable:!0})}).catch(function(t){e.loading=!1,e.$Message.error({content:"添加错误："+t,duration:10,closable:!0})})):this.$Message.error({content:"添加设备参数不能有空",duration:3,closable:!0})},toDelete:function(){var e=this;this.selected.id?o["a"].service("device").remove(this.selected.id).then(function(){e.loading=!1,e.listDelete(e.selected.id),e.$Message.success({content:"设备删除成功",duration:3,closable:!0})}).catch(function(t){e.loading=!1,e.$Message.error({content:"设备删除失败"+t,duration:10,closable:!0})}):this.$Message.error({content:"设备号不能为空",duration:3,closable:!0})},toUpdate:function(){var e=this;this.selected.id?o["a"].service("device").patch(this.selected.id,this.selected).then(function(){e.loading=!1,e.listUpdate(e.selected),e.$Message.success({content:"修改成功",duration:3,closable:!0})}).catch(function(t){e.loading=!1,e.$Message.error({content:"修改失败"+t,duration:10,closable:!0})}):this.$Message.error({content:"设备号不能为空",duration:3,closable:!0})}})},u=d,p=(s("3522"),s("2877")),f=Object(p["a"])(u,l,n,!1,null,"1c4ad053",null),m=f.exports,b=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"form-param"},[s("Form",{attrs:{model:e.selected,"label-position":"left","label-width":80,rules:e.ruleValidate}},[s("FormItem",{staticStyle:{margin:"0 0 20px 0"},attrs:{label:"设备号",prop:"id"}},[s("Input",{attrs:{clearable:"",type:"text",placeholder:"必须唯一，与设备对应，设备SN号"},model:{value:e.selected.id,callback:function(t){e.$set(e.selected,"id",t)},expression:"selected.id"}})],1),s("FormItem",{staticStyle:{margin:"0 0 20px 0"},attrs:{label:"用户名",prop:"name"}},[s("Input",{attrs:{clearable:"",type:"text",placeholder:"设备人员名称，列表显示名称"},model:{value:e.selected.name,callback:function(t){e.$set(e.selected,"name",t)},expression:"selected.name"}})],1),s("FormItem",{staticStyle:{margin:"0 0 20px 0"},attrs:{label:"用户单位",prop:"section"}},[s("Input",{attrs:{clearable:"",type:"text",placeholder:"用户所属单位或部门"},model:{value:e.selected.section,callback:function(t){e.$set(e.selected,"section",t)},expression:"selected.section"}})],1),s("FormItem",{staticStyle:{margin:"0 0 20px 0","text-align":"left"},attrs:{label:"操作时间",prop:"setup"}},[s("Date-picker",{attrs:{type:"datetime",clearable:"",editable:!1,format:"yyyy/MM/dd HH:mm",placeholder:"设备安装时间"},model:{value:e.selected.setup,callback:function(t){e.$set(e.selected,"setup",t)},expression:"selected.setup"}})],1)],1)],1)},g=[],h={data:function(){return{ruleValidate:{id:[{required:!0,message:"不能为空",trigger:"blur"}],name:[{required:!0,message:"不能为空",trigger:"blur"}],section:[{required:!0,message:"不能为空",trigger:"blur"}],setup:[{required:!0,type:"date",message:"不能为空",trigger:"blur"}]}}},computed:Object(r["c"])({selected:"selected"})},v=h,x=(s("3519"),Object(p["a"])(v,b,g,!1,null,"6f2c0b74",null)),y=x.exports,$={data:function(){return{}},components:{"dev-info":y,"dev-control":m}},k=$,M=(s("a98c"),Object(p["a"])(k,a,c,!1,null,"3cc0bf8d",null));t["default"]=M.exports},5008:function(e,t,s){},a98c:function(e,t,s){"use strict";var a=s("0404"),c=s.n(a);c.a}}]);
//# sourceMappingURL=chunk-33124b94.f4229cdf.js.map