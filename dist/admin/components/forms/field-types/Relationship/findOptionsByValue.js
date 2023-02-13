export const findOptionsByValue = ({ value, options }) => {
    if (value) {
        if (Array.isArray(value)) {
            return value.map((val) => {
                let matchedOption;
                options.forEach((optGroup) => {
                    matchedOption = optGroup.options.find((option) => {
                        if (typeof val === 'object') {
                            return option.value === val.value && option.relationTo === val.relationTo;
                        }
                        return val === option.value;
                    });
                });
                return matchedOption;
            });
        }
        let matchedOption;
        options.forEach((optGroup) => {
            matchedOption = optGroup.options.find((option) => {
                if (typeof value === 'object') {
                    return option.value === value.value && option.relationTo === value.relationTo;
                }
                return value === option.value;
            });
        });
        return matchedOption;
    }
    return undefined;
};
