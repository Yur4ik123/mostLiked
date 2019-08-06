import "./user.component.scss";

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import ActiveRoute from "../../core/active.route.service";
import Routing from "../../core/routing.serice";
import DeleteModalComponent from "../deleteModal.component/deleteModal.component";

export default class UserComponent {
  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.activeRoute = new ActiveRoute();
    this.authUserId = this.authService.userId;
    this.activeUserId = this.activeRoute.parseRequestURL().id;
    this._routing = new Routing();
    this._deleteModal = new DeleteModalComponent();
  }
  async beforeRender() {
    this._user = await this.userService.getUser(this.activeUserId);
    this._userImages = await this.userService.getUserImages(this.activeUserId);
    this.imagesTemplate = this._userImages.images.map(image => {
      this._singleImageTemplate(image);
    });
  }
  render() {
    return ` <user-component>
              <div class="card mb-3" style="max-width: 540px">
                <div class="row no-gutters" style="background: url(${
                  this._user.cover
                }) no-repeat center/cover">
                  <div class="col-md-12" >
                          <span class="user-avatar-container d-flex justify-content-center flex-wrap 
                          >
                          <div class="user-avatar "   >
                            <img src="${this._user.avatar}" alt="">
                          </div>
                          
                  <div class="col-md-12">
                    <div class="card-body ">
                      <h5 class="card-title">${this._user.full_name}</h5>
                      <p class="card-text">
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                      </p>
                      <p class="card-text">
                        <small class="text-muted">Last updated 3 mins ago</small>
                      </p>
                    </div>
                  </span>
                </div>
              </div>
              <div class="images-container container"> <div class="row">${this.imagesTemplate.join(
                ""
              )}</div>
              
              </div>
              <div class="modal-container">

              </div>
            </user-component>
    `;
  }

  _singleImageTemplate(image) {
    return `<div class="col col-4">
    <div class="img-item" data-imageId="${image._id}">
      <img src="${image.url}" alt="" />
      <div class="img-item-bottom">
        <span
          ><i class="fas fa-eye"></i>
          ${image.view.length}
        </span>
        <span>
          <i class="fas fa-thumbs-up"></i>
          ${image.likes.length}
        </span>
        <span>
          <i class="fas fa-trash-alt delete-image"></i>
        </span>
      </div>
    </div>
  </div>
  
    `;
  }
  afterRender() {
    document.querySelector(".images-container").addEventListener("click", e => {
      if (e.target.classList.contains("delete-image")) {
        const imageId = e.target.closest("[data-imageId]").dataset.imageid;
        const [image] = this._userImages.images.filter(
          img => img._id === imageId
        );
        this._deleteModal.imagesForDelete = image;
        this._deleteModal.closeCallback = this.modalClose.bind(this);
        this._deleteModal.deleteImageCallback = this.deleteImage.bind(this);

        document.querySelector(
          ".modal-container"
        ).innerHTML = this._deleteModal.render();
        this._deleteModal.afterRender();
      }
    });
  }
  modalClose() {
    document.querySelector(".modal-container").innerHTML = "";
  }
  deleteImage(image_id, image_url) {
    //API req for deleting img;
    let imgContainer = document.querySelector(".images-container .row");
    imgContainer.innerHTML = "";
    this._userImages.images = this._userImages.images.filter(
      img => img._id !== image_id
    );
    this.imagesTemplate = this._userImages.images.map(image => {
      this._singleImageTemplate(image);
    });
    imgContainer.innerHTML = this._imagesTemplate.join("");
    this.modalClose();
  }
}
