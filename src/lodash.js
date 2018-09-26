import {set as setModule} from 'lodash'

function set(object, path, value){
  return setModule(object, path, value)
}
