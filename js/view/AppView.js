class AppView {

    constructor(navHeader, navFooter){

        this.navHeader = navHeader;
        this.navFooter = navFooter;
        this.setLayout();
    }

    _header(){

        return `<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">        
                    <a class="navbar-brand" href="#"><strong><span class="text-warning">Woola</span>weaver</strong></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHome" aria-controls="navbarHome" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>                    
                    <div class="collapse navbar-collapse" id="navbarHome">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="projects.html">Projects <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="profile.html">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="docs.html">Documentation</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div class="dropdown-menu" aria-labelledby="dropdown04">
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#exampleModal">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        </ul>
                        <form class="form-inline my-2 my-md-0">
                            <a class="nav-link" href="index.html">Sign out</a>
                        </form>
                    </div>
                </nav>`;
    }

    _footer(){

        return `<div class="container">
                    <span class="text-muted">© 2019 Woolaweaver, Designed and built with all the love in the world by <a href="https://github.com/sandroe2000">Sandroe2000</a></span>
                </div>`;
    }

    setLayout(){

        this.navHeader.innerHTML = this._header();
        this.navFooter.innerHTML = this._footer();
    }
}