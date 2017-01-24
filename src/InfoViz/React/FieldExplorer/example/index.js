/* global document d3 */
import 'normalize.css';

import                    React from 'react';
import                 ReactDOM from 'react-dom';

import   CompositeClosureHelper from '../../../../Common/Core/CompositeClosureHelper';
import            FieldExplorer from '../../FieldExplorer';
import       FieldHoverProvider from '../../../../InfoViz/Core/FieldHoverProvider';
import FieldInformationProvider from '../../../../InfoViz/Core/FieldInformationProvider';
import            FieldProvider from '../../../../InfoViz/Core/FieldProvider';
import           LegendProvider from '../../../../InfoViz/Core/LegendProvider';
import                dataModel from '../../../Native/HistogramSelector/example/state.json';

const container = document.querySelector('.content');
container.style.height = '100vh';
container.style.width = '100vw';
d3.select('body').style('overflow', 'hidden'); // Safari otherwise intercepts wheel events

const provider = CompositeClosureHelper.newInstance((publicAPI, model, initialValues = {}) => {
  Object.assign(model, initialValues);
  FieldProvider.extend(publicAPI, model, initialValues);
  FieldHoverProvider.extend(publicAPI, model, initialValues);
  FieldInformationProvider.extend(publicAPI, model, initialValues);
  LegendProvider.extend(publicAPI, model, initialValues);
})(dataModel);
provider.setFieldsSorted(true);
provider.getFieldNames().forEach((name) => {
  provider.addLegendEntry(name);
});
provider.assignLegend(['colors', 'shapes']);

ReactDOM.render(<FieldExplorer provider={provider} />, document.querySelector('.content'));
