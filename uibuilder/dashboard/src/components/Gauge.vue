<template>
<div class="gauge">
    <h5 class="text-center">{{type}}</h5>
    <div class="gauge-container">
        <vue-svg-gauge class="my-3"
        :min="min" :max="max" :value="value" 
        :separator-step="0"
        :gauge-color="[{ offset: 0, color: '#ffe659'}, { offset: 100, color: '#eb3349'}]">
        </vue-svg-gauge>
    </div>    
    <h4 class="text-center align-bottom">{{value}} {{unit}}</h4>
</div>        
</template>

<script>
const Type = {
    TEMP: "Teplota",
    HUM: "Vlhosť vzduchu",
    PRES: "Tlak",
    QUA: "Kvalita vzduchu"
};

module.exports = {
    props: [
        'value',
        'type', 
    ],

    data: function() {
        return {   
            Type                 
        };
    },

    computed: {
        max: function() {
            switch(this.type) {
                case Type.TEMP: return 45;
                case Type.HUM: return 100;
                case Type.PRES: return 1050;
                case Type.QUA: return 500;
            }
        },
        min: function() {
            switch(this.type) {
                case Type.TEMP: return 0;
                case Type.HUM: return 0;
                case Type.PRES: return 950;
                case Type.QUA: return 0;
            }
        },
        unit: function() {
            switch(this.type) {
                case Type.TEMP: return " °C";
                case Type.HUM: return " %";
                case Type.PRES: return " hPa";
                case Type.QUA: return " AQI";
            }
        },
    }
};
</script>

<style scoped>
.gauge{    
    width: 148.5px;
}
</style>