/*
    Vanilla AutoComplete v0.1
    Copyright (c) 2019 Mauro Marssola
    GitHub: https://github.com/marssola/vanilla-calendar
    License: http://www.opensource.org/licenses/mit-license.php
*/
'use strict';

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

var VanillaCalendar = (function () {
    function VanillaCalendar(options) {
        function addEvent(el, type, handler) {
            if (!el) return;
            if (el.attachEvent) el.attachEvent('on' + type, handler);else el.addEventListener(type, handler);
        }
        function removeEvent(el, type, handler) {
            if (!el) return;
            if (el.detachEvent) el.detachEvent('on' + type, handler);else el.removeEventListener(type, handler);
        }
        var opts = {
            selector: null,
            datesFilter: false,
            pastDates: true,
            availableWeekDays: [],
            availableDates: [],
            date: new Date(),
            todaysDate: new Date(),
            button_prev: null,
            button_next: null,
            month: null,
            month_label: null,
            onSelect: function onSelect(data, elem) {},
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            shortWeekday: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
        };
        for (var k in options) {
            if (opts.hasOwnProperty(k)) opts[k] = options[k];
        }var element = document.querySelector(opts.selector);
        if (!element) return;

        var getWeekDay = function getWeekDay(day) {
            return ['sábado', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][day];
        };

        var createDay = function createDay(date) {
            var newDayElem = document.createElement('div');
            var dateElem = document.createElement('span');
            dateElem.innerHTML = date.getDate();
            newDayElem.className = 'vanilla-calendar-date';
            newDayElem.setAttribute('data-calendar-date', date);

            var available_week_day = opts.availableWeekDays.filter(function (f) {
                return f.day === date.getDay() || f.day === getWeekDay(date.getDay());
            });
            var available_date = opts.availableDates.filter(function (f) {
                return f.date === date.getFullYear() + '-' + String(date.getMonth() + 1).padStart('2', 0) + '-' + String(date.getDate()).padStart('2', 0);
            });

            if (date.getDate() === 1) {
                newDayElem.style.marginLeft = date.getDay() * 14.28 + '%';
            }
            if (opts.date.getTime() <= opts.todaysDate.getTime() - 1 && !opts.pastDates) {
                newDayElem.classList.add('vanilla-calendar-date--disabled');
            } else {
                if (opts.datesFilter) {
                    if (available_week_day.length) {
                        newDayElem.classList.add('vanilla-calendar-date--active');
                        newDayElem.setAttribute('data-calendar-data', JSON.stringify(available_week_day[0]));
                        newDayElem.setAttribute('data-calendar-status', 'active');
                    } else if (available_date.length) {
                        newDayElem.classList.add('vanilla-calendar-date--active');
                        newDayElem.setAttribute('data-calendar-data', JSON.stringify(available_date[0]));
                        newDayElem.setAttribute('data-calendar-status', 'active');
                    } else {
                        newDayElem.classList.add('vanilla-calendar-date--disabled');
                    }
                } else {
                    newDayElem.classList.add('vanilla-calendar-date--active');
                    newDayElem.setAttribute('data-calendar-status', 'active');
                }
            }
            if (date.toString() === opts.todaysDate.toString()) {
                newDayElem.classList.add('vanilla-calendar-date--today');
            }

            newDayElem.appendChild(dateElem);
            opts.month.appendChild(newDayElem);
        };

        var removeActiveClass = function removeActiveClass() {
            var activeClass = document.querySelectorAll('.vanilla-calendar-date--selected');
            $.each(activeClass,function (index,s) {
                s.classList.remove('vanilla-calendar-date--selected');
            });
        };

        var selectDate = function selectDate() {
            var activeDates = element.querySelectorAll('[data-calendar-status=active]');
            $.each(activeDates, function (index, date) {
                $(date).on('click', function () {
                    removeActiveClass();
                    var datas = this.dataset;
                    var data = {};
                    if (datas.calendarDate) data.date = datas.calendarDate;
                    if (datas.calendarData) data.data = JSON.parse(datas.calendarData);
                    opts.onSelect(data, this);
                    this.classList.add('vanilla-calendar-date--selected');
                    $('.platicas').slick('slickGoTo', index);
                });
            });
        };

        var createMonth = function createMonth() {
            clearCalendar();
            var currentMonth = opts.date.getMonth();
            while (opts.date.getMonth() === currentMonth) {
                createDay(opts.date);
                opts.date.setDate(opts.date.getDate() + 1);
            }

            opts.date.setDate(1);
            opts.date.setMonth(opts.date.getMonth() - 1);
            opts.month_label.innerHTML = opts.months[opts.date.getMonth()] + ' ' + opts.date.getFullYear();
            selectDate();
        };

        var monthPrev = function monthPrev() {
            opts.date.setMonth(opts.date.getMonth() - 1);
            createMonth();
        };

        var monthNext = function monthNext() {
            opts.date.setMonth(opts.date.getMonth() + 1);
            createMonth();
        };

        var clearCalendar = function clearCalendar() {
            opts.month.innerHTML = '';
        };

        var createCalendar = function createCalendar() {
            document.querySelector(opts.selector).innerHTML = '\n            <div class="vanilla-calendar-header">\n                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="previous"><svg  height="22px" viewBox="0 0 19 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="WorkCafe" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g id="Workcafe_desktop_2interaccion" transform="translate(-1090.000000, -1480.000000)" stroke="#CC0000" stroke-width="4"><polyline id="Path-6-Copy-2" transform="translate(1100.000000, 1495.000000) scale(-1, 1) translate(-1100.000000, -1495.000000) " points="1093 1482 1107 1495 1093 1508"></polyline></g></g></svg></button>\n                <div class="vanilla-calendar-header__label" data-calendar-label="month"></div>\n                <button type="button" class="vanilla-calendar-btn" data-calendar-toggle="next"><svg height="22px" viewBox="0 0 19 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="WorkCafe" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g id="Workcafe_desktop_2interaccion" transform="translate(-1569.000000, -1480.000000)" stroke="#CC0000" stroke-width="4"><polyline id="Path-6-Copy" points="1571 1482 1585 1495 1571 1508"></polyline></g></g>\n            </svg></button>\n            </div>\n            <div class="vanilla-calendar-week"></div>\n            <div class="vanilla-calendar-body" data-calendar-area="month"></div>\n            ';
        };
        var setWeekDayHeader = function setWeekDayHeader() {
            document.querySelector(opts.selector + ' .vanilla-calendar-week').innerHTML = '\n                <span>' + opts.shortWeekday[0] + '</span>\n                <span>' + opts.shortWeekday[1] + '</span>\n                <span>' + opts.shortWeekday[2] + '</span>\n                <span>' + opts.shortWeekday[3] + '</span>\n                <span>' + opts.shortWeekday[4] + '</span>\n                <span>' + opts.shortWeekday[5] + '</span>\n                <span>' + opts.shortWeekday[6] + '</span>\n            ';
        };

        var clearCurrentEvent = function clearCurrentEvent() {
            var activeDates = document.querySelectorAll('.vanilla-calendar-date--selected');
            for (var i = 0; i < activeDates.length; i++) {
                activeDates[i].classList.remove('vanilla-calendar-date--selected');
            }
        };

        this.init = function () {
            createCalendar();
            opts.button_prev = document.querySelector(opts.selector + ' [data-calendar-toggle=previous]');
            opts.button_next = document.querySelector(opts.selector + ' [data-calendar-toggle=next]');
            opts.month = document.querySelector(opts.selector + ' [data-calendar-area=month]');
            opts.month_label = document.querySelector(opts.selector + ' [data-calendar-label=month]');

            opts.date.setDate(1);
            createMonth();
            setWeekDayHeader();
            addEvent(opts.button_prev, 'click', monthPrev);
            addEvent(opts.button_next, 'click', monthNext);
        };

        this.destroy = function () {
            removeEvent(opts.button_prev, 'click', monthPrev);
            removeEvent(opts.button_next, 'click', monthNext);
            clearCalendar();
            document.querySelector(opts.selector).innerHTML = '';
        };

        this.reset = function () {
            this.destroy();
            this.init();
        };

        this.currentEvent = function (fecha) {
            // console.log(fechas);
            // clearCurrentEvent();
            removeActiveClass();
            var activeDates = element.querySelectorAll('[data-calendar-status=active]');
            for (var i = 0; i < activeDates.length; i++) {
                if (fecha == activeDates[i].getAttribute('data-calendar-data')) {
                    activeDates[i].classList.add('vanilla-calendar-date--selected');
                }
            }
            // console.log(activeDates);
        };

        this.set = function (options) {
            for (var k in options) {
                if (opts.hasOwnProperty(k)) opts[k] = options[k];
            }createMonth();
            //             this.reset()
        };

        this.init();
    }
    return VanillaCalendar;
})();

window.VanillaCalendar = VanillaCalendar;