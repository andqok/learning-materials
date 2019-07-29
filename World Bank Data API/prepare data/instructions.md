view-source:https://data.worldbank.org/indicator
Look for href="/indicator/ or <section class="nav-item"
and get the right html (which is xml too)
wrap all sections to div
convert to json https://jsonformatter.org/xml-to-json
save as js file categories.js which includes object categories with all this data
