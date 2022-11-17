import replaceElement from './replaceElement';
import * as allIcons from './icons';

/**
 * Replaces all elements with matching nameAttr with the defined icons
 * @param {{ icons?: object, nameAttr?: string, attrs?: object }} options
 */
const createIcons = ({ icons = {}, nameAttr = 'icon-name', attrs = {} } = {}) => {
  if (!Object.values(icons).length) {
    throw new Error(
      "Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`",
    );
  }

  if (typeof document === 'undefined') {
    throw new Error('`createIcons()` only works in a browser environment.');
  }

  const elementsToReplace = querySelectorAll(`[${nameAttr}]`);

  Array.from(elementsToReplace).forEach((element) =>
    replaceElement(element, { nameAttr, icons, attrs }),
  );
};

export { createIcons };

/*
  Create Element function export.
*/
export { default as createElement } from './createElement';

/*
 Icons exports.
*/
export { allIcons as icons };
export * from './icons';

/**
 * Helper to enable querySelectorAll to recrusively pierce all Shadow DOM children 
 * @param {string} selectors
 * @returns {NodeList}
 *
 * Note: This only supports the querying of an *entire selector* in the current document
 * and all shadow DOM children recursively.
 * It *does not support* matching a selector's prefix in a shadow ancestor, and matching
 * the suffix of the selector inside the shadow tree.
 */
const querySelectorAll = (selectors) => {
  return explodeContext(document).flatMap(context => query(selectors, context));

  function query(selectors, context) {
    return Array.from(context.querySelectorAll(selectors));
  }

  function explodeContext(context, docs = []) {
    docs.push(context);

    const domIterator = document.createTreeWalker(context, NodeFilter.SHOW_ELEMENT);

    let node;

    while(node = domIterator.nextNode()) {
      if ( node.shadowRoot ) {
        explodeContext(node.shadowRoot, docs);
      }
    }

    return docs;
  }
}
