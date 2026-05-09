type NavigationRoute = {
  name: string;
  params?: Record<string, any> & { screen?: any; params?: any };
};

export const parseNavigationPath = (path: string): NavigationRoute | null => {
  if (!path) return null;

  const cleanPath = path
    .replace(/^(https?:\/\/)?(www\.)?fabletalkai\.work\/dl\/?/i, '')
    .replace(/^fabletalkai:\/\//i, '');
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const parseSegment = (index: number): NavigationRoute => {
    const [screenName, queryString] = segments[index].split('?');

    const params: Record<string, any> = {};
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    if (index < segments.length - 1) {
      const nextSegment = parseSegment(index + 1);
      return {
        name: screenName,
        params: {
          ...params,
          screen: nextSegment.name,
          params: nextSegment.params,
        },
      };
    }

    return {
      name: screenName,
      params: Object.keys(params).length > 0 ? params : undefined,
    };
  };

  return parseSegment(0);
};
