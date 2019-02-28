# SWOT Matrix Control for Dynamics 365 (8.2 or 9.x)

## Description

The SWOT Matrix Control for Dynamics 365 (8.2 or 9.x), can be added as web ressource to the account or opportunity form.

The SWOT matrix helps the sales people / the organisation to identify the

* Stenghts (internal)
* Weaknesses (internal)
* Opportunities (external)
* Threads (external)

related to business competition to win an opportunity or customer.

For usage see https://en.wikipedia.org/wiki/SWOT_analysis

This control ist based on Angular 7, Webpack 4, Angular Material, Angular CDK and Rxjs and communicated with the Dynamics WebApi.

Idea to include an custom Angular 7 Control in Dynamics 365 as Webresource and usage of the Dynamics 365 WebApi.

Proves that the production build gets super small (currently around ~500kb), even with Angular and Angular Material
This project was generated with Angular CLI version 7.2.0.

## Highlights

* 2 ways to build the application (Angular or Webpack) -- Angular build prefered
* Angular 7.x
* Angular Material
* Angular CDK
* Drag and Drop
* Webpack 4.x
* Rxjs for WebApi communication
* Integration with D365 Form oder D365 Web Api
* Works in Classic UI and Unified Interface
* Scales to different screen resolutions

## Minimum requirements:

* Tested on Dynamics 365 9.x for Web Api Integration (on premise, online) (current release and managed solution) - not tested on 8.x but should also work there

## Releases for download as managed solution

### V1.0 Managed Solution for Account and Opportunity Form


<a href="../master/install.md">Installation guide</a>


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

This is just a small project I did after my normal full time job, so there are still some open points:

* Unit testing
* Configuration of the matrix with a separate configuration entity
* CI integration
* Some UI enhancements / Design improvements
* Write manual for the 8.x form integration
* Icons are currently integrated via Googles CDN - maybe needs to be replaced if this is not suiteable for your implementation

## Questions / Suggestions

* Drop me an issue or an email: github [((at))] it-integrator.de

## Imprint / Disclaimer

* Use your own risk

<a href="../master/legal.imprint.md">Impressum / Imprint</a>
