class JRFlutterBoostDelegate : NSObject {

-(void )pushNativeRoute:(NSString *)pageName arguments:(NSDictionary *)arguments{
    if(pageName.length > 0 && pageName.containsString:(@"honeycombGoodsDetail")){
        NSArray *arr = pageName.componentsSeparatedByString:(@"=");
        if(arr.count > 1){
            NSString *goodsId = arr[1];
            JRNewGoodsDetailVC *goodsDetailVC = JRNewGoodsDetailVC.alloc().init();
            if(goodsDetailVC){
                JRSpecificationManager.sharedInstance().goodSelectedResult.goodsId = goodsId;
                UIViewController.topmostViewController().navigationController.pushViewController:animated:(goodsDetailVC,YES);
            }
        }
        return ;
    }
    if(pageName.length > 0){
        CommonTool.dealDongWoUrl:title:page_source:modular_source:(pageName,@"洞窝",@"flutter",@"flutter");
    }
}

}
