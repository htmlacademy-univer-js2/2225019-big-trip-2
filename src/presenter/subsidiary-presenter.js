import { render, replace, remove } from '../framework/render.js';
import PreviewPointView from '../view/preview-point-view.js';
import EditingFormView from '../view/editing-form-view.js';

const Mode = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

export default class SubsidiaryPresenter {
  #pointListContainer = null;
  #previewPointComponent = null;
  #editingPointComponent = null;
  #pointsModel = null;
  #destinations = null;
  #offers = null;
  #changeData = null;
  #changeMode = null;
  #point = null;
  #mode = Mode.PREVIEW;

  constructor(pointListContainer, pointsModel, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#changeMode = changeMode;
    this.#changeData = changeData;
  }

  init(point) {
    this.#point = point;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    const prevPreviewPointComponent = this.#previewPointComponent;
    const prevEditingPointComponent =  this.#editingPointComponent;

    this.#previewPointComponent = new PreviewPointView(point, this.#destinations, this.#offers);
    this.#editingPointComponent = new EditingFormView(point, this.#destinations, this.#offers);
    this.#previewPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#previewPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editingPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPreviewPointComponent === null || prevEditingPointComponent === null) {
      render(this.#previewPointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editingPointComponent, prevEditingPointComponent);

    if (this.#mode === Mode.PREVIEW) {
      replace(this.#previewPointComponent, prevPreviewPointComponent);
    }
    }
    remove(prevPreviewPointComponent);
    remove(prevEditingPointComponent);
  }

  destroy = () => {
    remove(this.#previewPointComponent);
    remove(this.#editingPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.PREVIEW) {
      this.#replaceEditingToPreviewPoint();
    }
  };

  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditingToPreviewPoint();
    }
  };

  #replacePreviewPointToEditingPoint = () => {
    replace(this.#editingPointComponent, this.#previewPointComponent);
    document.addEventListener('keydown', this.#escapeKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditingToPreviewPoint = () => {
    replace(this.#previewPointComponent, this.#editingPointComponent);
    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    this.#mode = Mode.PREVIEW;
  };

  #handlePreviewClick = (evt) => {
    evt.preventDefault();
    this.#replaceEditingToPreviewPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditingToPreviewPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePreviewPointToEditingPoint();
  };
}
