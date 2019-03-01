# SWOT Analysis Control (drag and drop) for Dynamics 365 (9.x or 8.2)

## Description

The SWOT Analysis Control for Dynamics 365 (8.2 or 9.x), can be added as a web resource to the account, opportunity or your custom entity form.

The SWOT Analysis helps the sales people / the organisation to identify the

* Stenghts (internal)
* Weaknesses (internal)
* Opportunities (external)
* Threads (external)

related to business competition to win an opportunity or customer.

For general usage see https://en.wikipedia.org/wiki/SWOT_analysis

This control is based on Angular 7, Webpack 4, Angular Material, Angular CDK and Rxjs and communicates with the Dynamics Web Api.

Realizes the Idea to include an custom Angular 7 Control in Dynamics 365 as Webresource and usage of the Dynamics 365 WebApi with Rxjs.

Proves that the production build gets super small (currently around ~500kb), even with Angular and Angular Material
This project was generated with Angular CLI version 7.2.0.

## Highlights

* Angular 7.x
* Angular Material
* Angular CDK
* Drag and Drop
* Webpack 4.x
* Rxjs for WebApi communication
* Works in Classic UI and Unified Interface
* Works in Dynamics 9.x
* Scales to different screen resolutions

## Minimum requirements:

* Tested on Dynamics 365 with Web Api Integration (online v9.0/v9.1) - not tested on 8.x but should also work there.
* Works on classic ui and unified interface - suggested usage is on unified interface ui, caused by the limited space on the classic ui form and that you may have to care about the refresh of the web resource after creating the record

## Releases for download as managed solution

### V1.0 Solutions for Account and Opportunity Form

<a href="../master/managedSolutions/SWOTMatrixforAccount_1_0_0_0.zip">SWOTMatrix for account form (unmanaged)</a><br/>
<a href="../master/managedSolutions/SWOTMatrixforAccount_1_0_0_0_managed.zip">SWOTMatrix for account form (managed)</a><br/>
<a href="../master/managedSolutions/SWOTMatrixforOpportunity_1_0_0_0.zip">SWOTMatrix for opportunity form (unmanaged)</a><br/>
<a href="../master/managedSolutions/SWOTMatrixforOpportunity_1_0_0_0_managed.zip">SWOTMatrix for opportunity form (managed)</a><br/>

<a href="../master/managedSolutions/quickinstall_guide.pdf">Installation guide</a>

You may use the unmanaged solution to add the swot matrix to your custom entity. In this case you need the following fields on the custom entity:

* mey_swot_strengths (Multiline text 2000)
* mey_swot_weaknesses (Multiline text 2000)
* mey_swot_opportunities (Multiline text 2000)
* mey_swot_threats (Multiline text 2000)

## Screenshots Unified Interface

<p align="center">
  <img src="../master/Screenshots/empty-unified.JPG" title="empty matrix / unified interface">
    <img src="../master/Screenshots/filled-unified.JPG" title="filled matrix / unified interface">
</p>

## Screenshots Classic Interface

<p align="center">
  <img src="../master/Screenshots/filled-classic.JPG" title="filled matrix / classic interface">
</p>

## Demo

<p align="center">
  <img src="../master/Screenshots/Demo.gif" title="Demo">
</p>

## Todos

This is just a small project I'm working on after my normal full time job, so there are still some open points:

* Unit testing
* Configuration of the matrix with a separate configuration entity
* CI integration
* Some UI enhancements / Design improvements
* Icons are currently integrated via Googles CDN - maybe needs to be replaced if this is not suiteable for your implementation

## Drawbacks on the classic ui

* On the classic UI you my have to refresh the web resource after create event:

Poll for the id / Refresh the Id in the webresource

```// Poll for id on create ...
var webResourceControl = Xrm.Page.getControl("WebResource_swotmatrix");
var src = webResourceControl.getSrc();
webResourceControl.setSrc(null);
// ... Manipulate the src to include the id ...
webResourceControl.setSrc(src);
```

In the unified interface Dynamics refreshes the web resource automatically after the record is created.

## Disclaimer

* Use your own risk
