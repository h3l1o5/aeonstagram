import _ from "lodash";
import moment from "moment";

export const convertStoriesToSectionListFormat = stories => {
  const result = _.chain(stories)
    .groupBy(story => moment(story.when).format("YYYYM"))
    .reduce((acc, group) => {
      const sortedGroup = _.chain(group)
        .sortBy(["when", "createAt"])
        .reverse()
        .value();

      const groupDate = moment(sortedGroup[0].when);
      return [
        ...acc,
        { data: sortedGroup, name: groupDate.format("YYYY年M月"), priority: groupDate.year() * 10 + groupDate.month() },
      ];
    }, [])
    .push({ data: [], name: "起點", priority: 0 })
    .sortBy("priority")
    .reverse()
    .value();

  result[0].isFirstGroup = true;
  result[result.length - 1].isLastGroup = true;

  return result;
};
