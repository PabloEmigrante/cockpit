(function($){

    App.module.controller("gallery", function($scope, $rootScope, $http){

        var id     = $("[data-ng-controller='gallery']").data("id"),
            dialog = new $.UIkit.modal.Modal("#meta-dialog");

        if(id) {

            $http.post(App.route("/api/galleries/findOne"), {filter: {"_id":id}}, {responseType:"json"}).success(function(data){

                if(data && Object.keys(data).length) {
                    $scope.gallery = data;
                }

            }).error(App.module.callbacks.error.http);

        } else {

            $scope.gallery = {
                name: "",
                fields:[{"name":"caption","type":"html"}, {"name":"url","type":"url"}],
                images: []
            };
        }

        $scope.metaimage = {};

        $scope.save = function() {

            var gallery = angular.copy($scope.gallery);

            gallery.images.forEach(function(image){
                gallery.fields.forEach(function(field){
                    if(!image.data[field.name]) image.data[field.name] = "";
                });
            });

            $http.post(App.route("/api/galleries/save"), {"gallery": gallery}).success(function(data){

                if(data && Object.keys(data).length) {
                    $scope.gallery = data;
                    App.notify(App.i18n.get("Gallery saved!"));
                }

            }).error(App.module.callbacks.error.http);
        };

        $scope.importFromFolder = function(){

            new PathPicker(function(path){

                if(String(path).match(/\.(jpg|png|gif)$/i)){
                    $scope.$apply(function(){
                        $scope.gallery.images.push({"path":path, data:{}});
                        App.notify(App.i18n.get("%s image(s) imported", 1));
                    });
                } else {

                    $.post(App.route('/mediamanager/api'), {"cmd":"ls", "path": String(path).replace("site:", "")}, function(data){

                        var count = 0;

                        if (data && data.files && data.files.length) {

                            data.files.forEach(function(file) {
                                if(file.name.match(/\.(jpg|png|gif)$/i)) {
                                    $scope.gallery.images.push({"path":"site:"+file.path, data:{}});

                                    count = count + 1;
                                }
                            });

                            $scope.$apply();

                        }

                        App.notify(App.i18n.get("%s image(s) imported", count));

                    }, "json");
                }

            }, "*");
        };

        $scope.selectImage = function(){

            new PathPicker(function(path){
                $scope.$apply(function(){
                    $scope.gallery.images.push({"path":path, data:{}});
                    App.notify(App.i18n.get("%s image(s) imported", 1));
                });
            }, "*.(jpg|png|gif)");
        };

        $scope.removeImage = function(index) {

            if(confirm(App.i18n.get("Are you sure?"))){
                $scope.gallery.images.splice(index, 1);
            }
        };

        $scope.imgurl = function(image) {
            return image.path.replace('site:', window.COCKPIT_SITE_BASE_URL);
        };

        $scope.showMeta = function(index){
            $scope.metaimage = $scope.gallery.images[index];
            dialog.show();
        };

        var imglist = $("#images-list");

        imglist.on("dragend", "[draggable]",function(){

            var images = [];

            imglist.children().each(function(){
                images.push(angular.copy($(this).scope().image));
            });

            $scope.$apply(function(){
                $scope.gallery.images = images;
            });
        });

        nativesortable(imglist[0]);
    });

})(jQuery);