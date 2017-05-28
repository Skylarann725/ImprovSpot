var spinners =[
    {
        slotWrap: $('#slot_wrapper1'),
        input: $('#random_location1'),
        selection: [
            {name: "Kong, TX"},
            {name: "Le, OH"}
        ],
        spinEvent: 'spin1',
        slotSelect: '#slot1',
        spinWrap: '.jSlots-wrapper1',
        num: 1
    },
    {
        slotWrap: $('#slot_wrapper2'),
        input: $('#random_location2'),
        selection: [
            {name: "Abilene, TX"},
            {name: "Akron, OH"}
        ],
        spinEvent: 'spin2',
        slotSelect: '#slot2',
        spinWrap: '.jSlots-wrapper2',
        num: 2

    },
    {
        slotWrap: $('#slot_wrapper3'),
        input: $('#random_location3'),
        selection: [
            {name: "Ching, TX"},
            {name: "Chong, OH"}
        ],
        spinEvent: 'spin3',
        slotSelect: '#slot3',
        spinWrap: '.jSlots-wrapper3',
        num: 3

    }];

$(function () {

    var random_index;
    //make list for slots recursively and call spin when complete
    function makeSlotList(list, spinner) {
        //could choose one random index and then populate with next 18 values instead, but need to account for looping at end
        if (list.length < 20) {//length chosen based on appearance of spin, can be changed
            var index = _.random(spinner.selection.length - 1);
            if (list.length === 1) {
                /*
                 This index will be second item in the list, which is our winning number
                 Save this for future reference
                 Instead of saving it, we could get the index attribute from the list item we end on
                 */
                random_index = index;
            }
            list.push('<li index=' + _.random(spinner.selection.length - 1) + '>' + spinner.selection[index].name + '</li>');
            return makeSlotList(list, spinner);
        } else {
            console.log('me finish making slot list');
            //slot list is complete
            //clear search field
            spinner.input.val('');
            //attach list, show jslots, run animation
            $(spinner.slotSelect).html(list.join('')).parent().show().trigger(spinner.spinEvent);
            return list;
        }
    }

    //before spinning, build out list to spin through and insert into the DOM
    function makeSlots(spinner) {
        console.log('me make slots');
        //start with current value
        var list = ['<li>' + spinner.input.val() + '</li>'];
        //call recursive list builder that won't spin slots until it's finished
        makeSlotList(list, spinner);
    }
    $.each(spinners, function (index) {
        console.log('im being made ' + spinners[index].spinEvent);
        $(spinners[index].slotSelect).jSlots({
            number: spinners[index].num,
            spinner: spinners[index].spinWrap,
            spinEvent: spinners[index].spinEvent,
            time: 300,
            loops: 1,
            endNum: 2,//spins backwards through the list. endNum 1 ends on the same value we started on
            onEnd: function (finalElement) {
                console.log('im spinning ' + spinners[index].spinEvent);
                //set result
                spinners[index].input.val(spinners[index].selection[random_index].name);
                //hide spinner
                $(this.spinner).hide();
            }
        });
    });
    //bind random button
    spinners[0].slotWrap.on('click', function () {
        console.log('1');
        if (spinners[0].input.val() === "") makeSlots(spinners[0]);
        else spinners[0].input.val("");
    });
    spinners[1].slotWrap.on('click', function () {
        console.log('2');
        if (spinners[1].input.val() === "") makeSlots(spinners[1]);
        else spinners[1].input.val("");
    });
    spinners[2].slotWrap.on('click', function () {
        console.log('3');
        if (spinners[2].input.val() === "") makeSlots(spinners[2]);
        else spinners[2].input.val("");
    });
});