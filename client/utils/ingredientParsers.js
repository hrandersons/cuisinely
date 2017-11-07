const unitMerger = (unitList) => {
  let units = unitList.split(', ');
  if (units.length > 1) {
    if (unitList.includes('cups')) {
      let cupsIndex;
      let tbspIndex;
      let tspIndex;
      if (unitList.includes('tablespoons') || unitList.includes('teaspoons')) {
        for (var i = 0; i < units.length; i ++) {
          if (units[i].includes('cups')) {
            cupsIndex = i;
          } else if (units[i].includes('tablespoons')) {
            tbspIndex = i;
          } else if (units[i].includes('teaspoons')) {
            tspIndex = i;
          }
        }
        let totalCups = Number(units[cupsIndex].split(' ')[0]);
        totalCups = Math.floor(totalCups + 1);
        let cups = units[cupsIndex].split(' ');
        cups[0] = totalCups;
        units[cupsIndex] = cups.join(' ');
        if (tbspIndex !== undefined && tspIndex !== undefined) {
          units.splice(tbspIndex, 1);
          for (var i = 0; i < units.length; i ++) {
            if (units[i].includes('teaspoons')) {
              tspIndex = i;
            }
          }
          units.splice(tspIndex, 1);
        } else if (tbspIndex !== undefined) {
          units.splice(tbspIndex, 1);
        } else if (tspIndex !== undefined) {
          units.splice(tspIndex, 1);
        }
        return units.join(', ');
      }
    } else if (unitList.includes('tablespoons') && unitList.includes('teaspoons')) {
      for (var i = 0; i < units.length; i ++) {
        if (units[i].includes('tablespoons')) {
          tbspIndex = i;
        } else if (units[i].includes('teaspoons')) {
          tspIndex = i;
        }
      }
      let totalTbsp = Number(units[tbspIndex].split(' ')[0]);
      totalTbsp = Math.floor(totalTbsp + 1);
      let tbsp = units[tbspIndex].split(' ');
      tbsp[0] = totaltbsp;
      units[tbspIndex] = tbsp.join(' ');
      units.splice(tspIndex, 1);
      return units.join(', ');
    } else {
      return units.join(', ');
    }
  }
  return units.join(', ');
};

export const commaRemover = (ingredientTitle) => {
  if (ingredientTitle.includes(',')) {
    return ingredientTitle.split(',').slice(0, -1).join(',');
  }
  return ingredientTitle;
};

export const parensRemover = (ingredientTitle) => {
  if (ingredientTitle.includes('(')) {
    let openIndex = ingredientTitle.indexOf('(');
    let closeIndex = ingredientTitle.indexOf(')');
    let subset = ingredientTitle.substring(openIndex + 1, closeIndex);
    let splitSet = subset.split(' ');
    if (Number(splitSet[0])) {
      return ingredientTitle;
    } else {
      let parsedStart = ingredientTitle.substring(0, openIndex);
      let parsedEnd = ingredientTitle.substring(closeIndex + 1);
      return parsedStart + parsedEnd;
    }
  }
  return ingredientTitle;
};


export default unitMerger;
