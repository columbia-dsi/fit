var Answer = require('../models/Answer');
var Exercise = require('../models/Exercise');

function find_in_object(my_object, my_criteria){
    return my_object.filter(function(obj) {
    return Object.keys(my_criteria).every(function(c) {
        return obj[c] == my_criteria[c];
    });
    });
}


function randomNoRepeats(array) {  //-- only repeats once all items are exhausted.
    var copy = array.slice(0);
    return function() {
      if (copy.length < 1) { copy = array.slice(0); }
      var index = Math.floor(Math.random() * copy.length);
      var item = copy[index];
      copy.splice(index, 1);
      return item;
    };
}


function shuffle(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}


var controller = {
    createAnswer: function(answer, cb){
        console.time('createAnswer');
        answer_json = {
            name: answer.name, 
            email: answer.email,
            feedbacks: answer.message,
            goal: answer['q-2'] == 'Random'? shuffle(['Strength', 'Toning', 'Cardio'])[0] : answer['q-2'],
            time: answer['q-3'] == 'Random'? shuffle(['Little', 'Some', 'A lot'])[0] : answer['q-3'],
            level: answer['q-4'] == 'Random'? shuffle(['Beginner', 'Intermediate', 'Advanced'])[0] : answer['q-4']
        };
        var newAnswer = new Answer(answer_json);
        if(answer.name && answer.email){
            newAnswer.save(function (err) {
                if (err) {
                    console.log(err);
                    console.timeEnd('createAnswer');
                    cb({status: 500, content: err});
                } else {
                    console.log('createAnswer!');
                    console.timeEnd('createAnswer');
                    module.exports.getRecommendation(answer_json, function(e){
                        cb({status: 200, content: e});
                    });
                }
            });
        }else{
            module.exports.getRecommendation(answer_json, function(e){
                cb({status: 200, content: e});
            });
        }
        
        
    },

    findAnswers: function (cb) {
        console.time('findAnswers');
        Answer.find(function (err, answers) {
            if (err) {
                console.error(err);
                console.timeEnd('findAnswers');
                cb({status: 404, content: err});
            }else{
                console.log(answers);
                console.timeEnd('findAnswers');
                cb({status: 200, content: answers});
            }
        });
    },

    findAnswerById: function (id, cb) {
        console.time('findAnswerById');
        Answer.find({ _id: id }, function(err, answer){
            if (err) {
                console.error(err);
                console.timeEnd('findAnswerById');
                cb({status: 404, content: err});
            }else{
                console.log(answer);
                console.timeEnd('findAnswerById');
                cb({status: 200, content: answer});
            }
        });
    },

    findAnswerByName: function (name, cb) {
        console.time('findAnswerByName');
        Answer.find({ name: name }, function(err, answer){
            if (err) {
                console.error(err);
                console.timeEnd('findAnswerByName');
                cb({status: 404, content: err});
            }else{
                //console.log(answer);
                console.timeEnd('findAnswerByName');
                cb({status: 200, content: answer});
            }
        });
    },
    // exercises:
    getList: function (cb) {
        console.time('getList');
        Exercise.find(function (err, list) {
            if (err) {
                console.error(err);
                console.timeEnd('getList');
                cb({status: 404, content: err});
            }else{
                console.log(list);
                console.timeEnd('getList');
                cb({status: 200, content: list});
            }
        });
    },
    getRecommendation: function (answer, cb) {
        console.time('getList');
        Exercise.find(function (err, list) {
            if (err) {
                console.error(err);
                console.timeEnd('getList');
                cb(err);
            }else{
                //console.log(list);
                //break down into warm, cool, core
                ///////////1. filer
                //We do that to ensure to get a correct JSON
                var my_json = JSON.stringify(list);
                //We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
                var warm_general = find_in_object(JSON.parse(my_json), {group: 'General Full-body Warm-up'});
                var warm_upper = find_in_object(JSON.parse(my_json), {group: 'Upper-body Dynamic Stretches'});
                var warm_lower = find_in_object(JSON.parse(my_json), {group: 'Lower-body Dynamic Stretches'});

                var x_list = find_in_object(JSON.parse(my_json), {group: 'Upper Body Extensors (Chest/Triceps/Shoulders)', level: answer.level});
                var y_list = find_in_object(JSON.parse(my_json), {group: 'Lower Body (Thighs/Glutes/Hamstrings)', level: answer.level});
                var z_list = find_in_object(JSON.parse(my_json), {group: 'Upper Body Flexors (Back and Biceps)', level: answer.level});
                var a_list = find_in_object(JSON.parse(my_json), {group: 'Core Abs and Lower Back', level: answer.level});
                var b_list = find_in_object(JSON.parse(my_json), {type: 'Aerobic', level: answer.level});

                var cool_list = find_in_object(JSON.parse(my_json), {type: 'Static'});
                
                ///////////2. randomize
                var warm = [];
                var chooser_general = randomNoRepeats(warm_general); //3
                var chooser_upper = randomNoRepeats(warm_upper); //1
                var chooser_lower = randomNoRepeats(warm_lower); //1
                warm.push(chooser_general());
                warm.push(chooser_upper());                
                warm.push(chooser_general());
                warm.push(chooser_lower());
                warm.push(chooser_general());


                //var core = [];
                var day1 = [];
                var day2 = [];
                var day3 = [];
                var chooser_x = randomNoRepeats(x_list); //4
                var chooser_y = randomNoRepeats(y_list); //4
                var chooser_z = randomNoRepeats(z_list); //4
                var chooser_a = randomNoRepeats(a_list); //3
                var chooser_b = randomNoRepeats(b_list); //3
                var red = [];
                red.push(chooser_x());
                red.push(chooser_y());
                red.push(chooser_z());
                red = shuffle(red);
                //day1
                day1.push(chooser_x());
                day1.push(chooser_y());
                day1.push(chooser_z());
                day1 = shuffle(day1);
                day1.push(red[0]);
                day1.push(chooser_b());
                day1.push(chooser_a());
                //day2
                day2.push(chooser_x());
                day2.push(chooser_y());
                day2.push(chooser_z());
                day2 = shuffle(day2);
                day2.push(red[1]);
                day2.push(chooser_b());
                day2.push(chooser_a());
                //day3
                day3.push(chooser_x());
                day3.push(chooser_y());
                day3.push(chooser_z());
                day3 = shuffle(day3);
                day3.push(red[2]);
                day3.push(chooser_b());
                day3.push(chooser_a());


                var cool = [];
                var chooser_cool = randomNoRepeats(cool_list); //5
                cool.push(chooser_cool())
                cool.push(chooser_cool())
                cool.push(chooser_cool())
                cool.push(chooser_cool())
                cool.push(chooser_cool())

                console.timeEnd('getList');
                // console.log('day1:', day1)
                // console.log('day2:', day2)
                // console.log('day3:', day3)

                if(answer.level == 'Intermediate'){
                    var day4 = [];
                    day4.push(chooser_x());
                    day4.push(chooser_y());
                    day4.push(chooser_z());
                    day4 = shuffle(day4);
                    var red2 = [];
                    red2.push(chooser_x());
                    red2.push(chooser_y());
                    red2.push(chooser_z());
                    red = shuffle(red2);
                    day4.push(red2[0]);
                    day4.push(chooser_b());
                    day4.push(chooser_a());
                    cb({list:{warm: warm, core: {day1: day1, day2: day2, day3: day3, day4: day4}, cool: cool}, answer:answer});
                }else if(answer.level == 'Advanced'){
                    var day4 = [];
                    day4.push(chooser_x());
                    day4.push(chooser_y());
                    day4.push(chooser_z());
                    day4 = shuffle(day4);
                    var red2 = [];
                    red2.push(chooser_x());
                    red2.push(chooser_y());
                    red2.push(chooser_z());
                    red = shuffle(red2);
                    day4.push(red2[0]);
                    day4.push(chooser_b());
                    day4.push(chooser_a());

                    var day5 = [];
                    day5.push(chooser_x());
                    day5.push(chooser_y());
                    day5.push(chooser_z());
                    day5 = shuffle(day5);
                    day5.push(red2[1]);
                    day5.push(chooser_b());
                    day5.push(chooser_a());

                    cb({list:{warm: warm, core: {day1: day1, day2: day2, day3: day3, day4: day4, day5: day5}, cool: cool}, answer:answer});
                }else{
                    cb({list:{warm: warm, core: {day1: day1, day2: day2, day3: day3}, cool: cool}, answer:answer});
                }            
            }
        });
    }
    //...
}


module.exports = controller;