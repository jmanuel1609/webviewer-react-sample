import WebViewer from '@pdftron/webviewer'
import React, {useEffect, useRef} from "react";


function PdfView(){
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/PDFTRON_about.pdf',
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);



        instance.UI.setHeaderItems(function(header) {
          header.getHeader('toolbarGroup-Annotate').push({
            type: 'actionButton',
            img: '/assets/expand-light.svg',
            onClick: () => {
              instance.UI.toggleFullScreen();

            },
            dataElement: 'alertButton',
          });
        });
      });
    });
  }, []);

  return (

    <div className="assetContainer">
      <div className="webviewer" ref={viewer}/>
    </div>
  );
}

export default PdfView;
