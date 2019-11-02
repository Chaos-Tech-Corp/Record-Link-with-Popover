# Link with Popover

This component creates link to a record, displaying a compact view of the record when the mouse overs the link, similar to the native Salesforce functionality. 

![link popover example](assets/link_popover_example.png?raw=true)

## Usage

Define the `linear_path` component in a custom component markup:

```xml
<aura:component>

    <c:link_to_record recordId="{!v.recordId}"
                      recordName="Order 10001"  
                      fields="['OrderNumber','TotalAmount','EffectiveDate']" />

</aura:component>
```

## Properties

- `recordId` _(String)_ - Id of the record to navigate to.
- `recordName` _(String)_ - Name (_label_) of the record _(optional)_.
- `fields` _(List)_ - List with the name of the fields to display in the compact view. The first field will be used as the `recordName`.

###### NOTES &amp; CONSIDERATIONS

The component behaves different if the `recordName` is specified or not, so consider it when using it inside an iteration.

When the `recordName` is not specified/ empty, the component will display a placeholder bar for the text, and then load the record details on initalization, otherwise it loads the record details only when the mouse hover the link.

The ideal scenario would be to display the compact layout associated to the object the record belongs to, but so far didn´t find a way to do it.

It does not use the `lightning:navigation` component to generate the url to navigate to the new record on purpose, instead uses the `force:navigateToSObject` event.

###### TODO

- Autocalculate the position of the popup div.
