import { render, replace, remove } from '../framework/render.js';
import PreviewPointView from '../view/preview-point-view.js';
import EditingFormView from '../view/editing-form-view.js';

const Mode = {
  PREVIEW: 'preview',
  EDITING: 'editing',
};

export default class SubsidiaryPresenter {
  #point = null;
  #previewPointComponent = null;
  #editingPointComponent = null;
  #pointsModel = null;
  #pointListBox = null;
  #destinations = null;
  #offers = null;
  #changeMode = null;
  #changeData = null;
  #mode = Mode.PREVIEW;

  constructor(pointListBox, pointsModel, changeData, changeMode) {
    this.#pointListBox = pointListBox;
    this.#pointsModel = pointsModel;
    this.#changeMode = changeMode;
    this.#changeData = changeData;
  }

  init(point) {
    this.#point = point;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    const prevEditingPointComponent =  this.#editingPointComponent;
    const prevPreviewPointComponent = this.#previewPointComponent;

    this.#editingPointComponent = new EditingFormView(point, this.#destinations, this.#offers);
    this.#previewPointComponent = new PreviewPointView(point, this.#destinations, this.#offers);
    this.#previewPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#previewPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editingPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPreviewPointComponent === null || prevEditingPointComponent === null) {
      render(this.#previewPointComponent, this.#pointListBox);
      return;
    }

    switch (this.#mode) {
      case Mode.PREVIEW:
        replace(this.#previewPointComponent, prevPreviewPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#editingPointComponent, prevEditingPointComponent);
        break;
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
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  #replacePreviewPointToEditingPoint = () => {
    replace(this.#editingPointComponent, this.#previewPointComponent);
    document.addEventListener('keydown', this.#escapeKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditingPointToPreviewPoint = () => {
    replace(this.#previewPointComponent, this.#editingPointComponent);
    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    this.#mode = Mode.PREVIEW;
  };

  #handlePreviewClick = () => {
    this.#editingPointComponent.reset(this.#point);
    this.#replaceEditingPointToPreviewPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditingPointToPreviewPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePreviewPointToEditingPoint();
  };
}

