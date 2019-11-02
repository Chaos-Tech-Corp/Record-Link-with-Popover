({
    doInit : function(cmp, event, helper) {
        var recordName = cmp.get("v.recordName");
        if(!recordName) {
            //if there is no name, load the record details
            $A.enqueueAction(cmp.get("c.loadDetails"));
        }
    },
    
    loadDetails : function(cmp, event, helper) {
        var action = cmp.get("c.loadRecord"),
            fields = cmp.get("v.fields");
        action.setParams({ recordId : cmp.get("v.recordId"), fields : fields});
        action.setCallback(this, function(response) {
            var data = response.getReturnValue(),
                values = [];
            
            for(var i = 1; i < fields.length; i++) {
                values.push({'label': fields[i],
                             'value': data.fields[fields[i]]});
            }

            cmp.set("v.values", values);
            cmp.set("v.recordName", data.fields[fields[0]]);
            cmp.set("v.objectName", data.objectName.toLowerCase());
            cmp.set("v.isLoading", false);
        });
        $A.enqueueAction(action);
        
    },
    
    handleMouseOverOrFocusElement: function(cmp, event, helper) {
        var isLoading = cmp.get("v.isLoading");
        if (isLoading) {
            $A.enqueueAction(cmp.get("c.loadDetails"));
        }
		cmp.set("v.showPop", true);
    },
    
    handleMouseLeaveOrBlurElement: function(cmp, event, helper) {
        cmp.set("v.showPop", false);
    },
    
    handleNavClick: function(cmp, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": cmp.get("v.recordId")
        });
        navEvt.fire();
    }
})
