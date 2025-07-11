# Description

Skeleton Loading UI is a vesitile component library meant for rapid composing of loading views across application. It consists of a number of recognizible components, like cards, tables or charts, that can be configured to mimic any view of the application and replace loding spinners. Following best practices skeleton view should be used whenever there are multiple elements of a view loading. Thanks to that, interface feels more responsive and informative.

***

# Usage

Use Skeleton UI like any other fallback component using *ngIf, *ngIf else; Always render single component, complex views are achieved by passing config array:

```markup
<div class="container" *ngIf="dataReady; else loading">
  // content waiting for data...
</div>

<ng-template #loading>
  <skeleton-ui [config]="config"></skeleton-ui>
</ng-template>
```

***

# Config array

Array of arrays of objects. Config array represents a main column of the view and nested arrays represent rows. Objects represent single components.

```typescript

const config: Array<Array<SkeletonComponent>>;

interface SkeletonComponent {
    component: 'photo-card' | 'insight-card' | 'bar-chart' | 'pie-chart' | 'table' | 'background'
    flex?: number    // flex basis applied to elements in a row, default: 1;
    height?: number  // value in pixels - if not passed uses components defaults;
}

```

# Config example

```js
const config = [
  [{ component: 'insight-card' }, { component: 'insight-card' }, { component: 'insight-card' }],
  [{ component: 'pie-chart' }, { component: 'pie-chart' }, { component: 'table', flex: 2 }],
  [{ component: 'table', flex: 2, height: 800 }, { component: 'photo-card', height: 800 }],
]

```
Above config will render three-rows layout with:
- 3 insight cards (of equal width and default height) in the first row
- 2 pie charts taking 25% of width each and a table taking remaining 50% of a width in the second row
- 2 tables of a height of 800px, where the first one is taking 2/3 of the width in the third row.

***

# Layout

Layout is flex-based. Rows will fill up available space and components will fill up rows' width. Without passing `flex` property all components will default to `flex-basis: 1;` and stretch evenly across.

>*For example:* if we want to render one element taking 25% of a width and second one taking 75%, we should pass value `flex: 3` to the second element


# API

Objects defining components have one required property `component` of a union type, and two optional properties: `flex` and `height`.


|Property|required|type|description|default|
|---|---|---|---|---|
|component|true| 'background' &#124; 'insight-card' &#124; 'photo-card' &#124; 'pie-chart' &#124; 'bar-chart' &#124; 'table' | type of the ui component|n/a|
|flex|false|number|flex basis for asymetric rows|1|
|height|false|number|element height in pixels|differs per component|

***

# Components

## 1. Bar chart
- component: 'bar-chart'
- default height: 400px

## 2. Pie chart
- component: 'pie-chart'
- default height: 400px

## 3. Insight card
- component: 'insight-card'
- default height: 130px
- typical insight card

## 4. Photo card
- component': 'photo-card'
- default height: 400px
- more generic type of a card

## 5. Table
- component: 'table'
- default height: 500px
- number of rows is calculated based on passed or default height;

## 6. Generic background
- component: 'background'
- default height: 500px
- meant for unusual elements, will strech to the container and provide grey background with pulsing animation;
- dimensions of the container have to be defined
- pass config array like so: `[config]="[[{ component: 'background' }]]";`
