import React, { useEffect, useRef } from "react";

const Converter = () => {
  const isScriptLoaded = useRef(false);

  useEffect(() => {
    if (!isScriptLoaded.current) {
      // Create the script for the external widget
      const script1 = document.createElement("script");
      script1.src =
        "https://www.cashbackforex.com/Content/remote/remote-widgets.js";
      script1.async = true;

      // Append the script to the document
      document.body.appendChild(script1);

      // Execute RemoteCalc only when the script is loaded
      script1.onload = () => {
        if (typeof window.RemoteCalc !== "undefined") {
          window.RemoteCalc({
            Url: "https://www.cashbackforex.com",
            TopPaneStyle:
              "YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCMzNDM1NDAgMCUsICMyNDI4MzEgMTAwJSk7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyLWJvdHRvbTogbm9uZTs=",
            BottomPaneStyle:
              "YmFja2dyb3VuZDogIzE1MTgxZDsgYm9yZGVyOiBzb2xpZCAwcHggIzJhMmUzOTsgY29sb3I6ICM5MTk0YTE7",
            ButtonStyle:
              "YmFja2dyb3VuZDogIzM0MzU0MDsgY29sb3I6IHdoaXRlOyBib3JkZXItcmFkaXVzOiAyMHB4Ow==",
            TitleStyle:
              "dGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiA0MHB4OyBmb250LXdlaWdodDogNTAwOw==",
            TextboxStyle:
              "YmFja2dyb3VuZDogIzE1MTgxZDsgY29sb3I6ICM5MTk0YTE7IGJvcmRlcjogc29saWQgMHB4ICM5MTk0YTE7",
            ContainerWidth: "665",
            HighlightColor: "rgba(0,0,0,1.0)",
            IsDisplayTitle: false,
            IsShowEmbedButton: false,
            CompactType: "large",
            DefaultCurrencyFrom: "USD",
            DefaultCurrencyTo: "INR",
            Calculator: "currency-converter",
            ContainerId: "currency-converter-900773",
          });
        }
      };

      // Mark the script as loaded
      isScriptLoaded.current = true;
    }
  }, []);

  return (
    <div
    className="currency-converter"
      id="currency-converter-900773"
      style={{ width: "150%", maxWidth: "665px" }}
    ></div>
  );
};

export default Converter;
