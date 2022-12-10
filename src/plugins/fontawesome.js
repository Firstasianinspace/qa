// Не было времени создать свой компонент с иконками и искать кастомные иконки, поэтому prerelease версия vue-fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// не нравится как пришлось добавить компонент
import {
  faList,
  faBorderAll,
  faLocationDot,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";
library.add(faList, faBorderAll, faLocationDot, faMugHot);

export default FontAwesomeIcon;
