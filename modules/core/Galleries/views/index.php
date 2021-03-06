{{ $app->assets(['galleries:assets/galleries.js','galleries:assets/js/index.js']) }}

<div data-ng-controller="galleries">

    <nav class="uk-navbar uk-margin-large-bottom">
        <span class="uk-navbar-brand">@lang('Galleries')</span>
        <div class="uk-navbar-content">
            <form class="uk-form uk-margin-remove uk-display-inline-block">
                <div class="uk-form-icon">
                    <i class="uk-icon-filter"></i>
                    <input type="text" placeholder="@lang('Filter by name...')" data-ng-model="filter">
                </div>
            </form>
        </div>
        <ul class="uk-navbar-nav">
            <li><a href="@route('/galleries/gallery')" title="@lang('Add gallerie')" data-uk-tooltip="{pos:'right'}"><i class="uk-icon-plus-circle"></i></a></li>
        </ul>
    </nav>

    <div class="uk-grid" data-uk-grid-margin data-uk-grid-match>
        <div class="uk-width-1-1 uk-width-medium-1-3 uk-width-large-1-4" data-ng-repeat="gallery in galleries" data-ng-show="matchName(gallery.name)">

            <div class="app-panel app-panel-box">

                <strong>@@ gallery.name @@</strong>

                <div class="uk-margin">
                    <span class="uk-badge app-badge" title="Last update">@@ gallery.modified |fmtdate:'d M, Y H:i' @@</span>
                </div>


                <span class="uk-button-group">
                    <a class="uk-button uk-button-small" href="@route('/galleries/gallery')/@@ gallery._id @@" title="@lang('Edit gallery')" data-uk-tooltip="{pos:'bottom'}"><i class="uk-icon-pencil"></i></a>
                    <a class="uk-button uk-button-danger uk-button-small" data-ng-click="remove($index, gallery)" href="#" title="@lang('Delete gallery')" data-uk-tooltip="{pos:'bottom'}"><i class="uk-icon-minus-circle"></i></a>
                </span>
            </div>
        </div>
    </div>


    <div class="uk-text-center app-panel" data-ng-show="galleries && !galleries.length">
        <h2><i class="uk-icon-picture-o"></i></h2>
        <p class="uk-text-large">
            @lang('You don\'t have any galleries created.')
        </p>

        <a href="@route('/galleries/gallery')" class="uk-button uk-button-success uk-button-large">@lang('Create a gallery')</a>
    </div>

</div>