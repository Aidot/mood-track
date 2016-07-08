var app = angular.module('main');

app.filter("mealtime", function () {
	return function (date) {
		if (!date) {
			return '';
		}

		/* hour is before noon */
		if (date.getHours() < 12) {
			return 'Breakfast'
		}
		else  /* Hour is from noon to 5pm (actually to 5:59 pm) */
		if (date.getHours() >= 12 && date.getHours() <= 17) {
			return 'Lunch'
		}
		else  /* the hour is after 5pm, so it is between 6pm and midnight */
		if (date.getHours() > 17 && date.getHours() <= 24) {
			return 'Dinner'
		}
		else  /* the hour is not between 0 and 24, so something is wrong */
		{
			return 'Strange Time'
		}

	};
});

app.filter("levelName", function () {
	return function (level) {

		switch (level) {
			case 1:
				return '倾听者'
				break;
			case 2:
				return '三级咨询师'
				break;
			case 3:
				return '二级咨询师'
				break;
			default:
		}

	};
});
